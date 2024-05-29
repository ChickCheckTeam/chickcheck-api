import Hapi from "@hapi/hapi";
import routes from "./routes.js";
import HapiJWT from "hapi-auth-jwt2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const env = dotenv.config().parsed;

(async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            payload: {
                maxBytes: 1000000,
            },
        },
    });

    await server.register(HapiJWT);

    server.state('session', {
        ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
        path: '/',
        encoding: 'none',   // we already used JWT to encode
        isSecure: env.NODE_ENV === "production",    // false == http, true == https
        clearInvalid: true, // remove invalid cookies
    })

    server.auth.strategy('jwt', 'jwt', { 
        key: env.JWT_SECRET, // Never Share your secret key
        validate: async function (decoded, request, h) {
            if(!decoded.id) {
                return { isValid: false };
            }

            const header = request.headers.authorization.split(" ")[1];
            console.log({
                text: "berhasil masuk pake token",
                decoded,
                request: request.state.session,
                header,
            })

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

    server.route(routes);

    process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
    });

    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
})();