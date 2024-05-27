import handler from './handler.js';
import AuthHandler from '../middleware/authController.js';

const routeCore = "/api";

const routes = [
    {
        path: routeCore + '/',
        method: 'GET',
        handler: handler.home
    },
    {
        path: routeCore + '/register',
        method: 'POST',
        handler: AuthHandler.register
    },
    {
        path: routeCore + '/predict',
        method: 'POST',
        handler: handler.home,
        options: {
            payload: {
                allow: 'application/json',
            }
        }
    },
]

export default routes;