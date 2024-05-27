import Hapi from "@hapi/hapi";
import routes from "./routes.js";

(async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
            payload: {
                maxBytes: 1000000,
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
})();