import Hapi from "@hapi/hapi";
import routes from "./routes.js";
import HapiJWT from "hapi-auth-jwt2";
import dataService from "../services/dataService.js";
import dotenv from "dotenv";
import { InputError } from "../services/ClientError.js";
// import tfModel from '../services/loadModel.js';

const env = dotenv.config().parsed;

(async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            payload: {
                maxBytes: 10 * 1000000,
            },
        },
    });

    const bucket = await dataService.getBucket("tensorflowjs-chickcheck-model");

    const file = bucket.file("model1/model.json");

    let setUrl = null;
    const [url] = await file.getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + 3 * 24 * 60 * 60 * 1000, // 3 day
    });
    setUrl = url;
    setInterval(async () => {
        const [url] = await file.getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 3 * 24 * 60 * 60 * 1000, // 3 day
        });
        setUrl = url;
    }, 3 * 24 * 60 * 60 * 1000); // 3 day

    await server.register(HapiJWT);

    server.state('session', {
        // ttl: Date.now() + 365 * 24 * 60 * 60 * 1000, // expires a year from today
        ttl: null, // session cookie will be removed when the browser is closed
        path: '/',
        encoding: 'none',   // we already used JWT to encode
        isSecure: env.NODE_ENV === "production",    // false == http, true == https
        clearInvalid: true, // remove invalid cookies
    })

    server.state('signedURL', {
        ttl: null, // cookie never expires
        isSecure: process.env.NODE_ENV === 'production',
        encoding: 'none',
        clearInvalid: true,
    });

    server.auth.strategy('jwt', 'jwt', { 
        key: env.JWT_SECRET, // Never Share your secret key
        validate: async function (decoded, request, h) {
            if(!decoded.id) {
                return { isValid: false };
            }

            const header = request.headers.authorization.split(" ")[1];

            if(header !== request.state.session) {
                return h.response({
                    message: 'Token invalid'
                }).code(401);
            }

            return { isValid: true };
        },
        verifyOptions: {
            algorithms: [ 'HS256' ]    // specify your secure algorithm
        }
    });
    
    server.auth.default('jwt');

    // const model = await tfModel.loadModel(setUrl);
    // server.app.model = model;

    server.route(routes);

    server.ext('onPreResponse', function (request, h) {
        const response = request.response;
    
        if (response instanceof InputError) {
            return h.response({
                status: 'fail',
                message: `Terjadi kesalahan dalam melakukan prediksi`,
            }).code(response.statusCode);
        }
    
        if (response.isBoom) {
            return h.response({
                status: 'fail',
                message: response.message,
            }).code(response.output.statusCode);
        }
    
        if (request.payload && request.payload.length > 1000000) {
            return h.response({
                status: 'fail',
                message: 'Payload content length greater than maximum allowed: 1000000',
            }).code(413);
        }
    
        if (response.statusCode === 400) {
            return h.response({
                status: 'fail',
                message: 'Terjadi kesalahan dalam melakukan prediksi',
            }).code(400);
        }
    
        return h.continue;
    });

    process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
    });

    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
})();