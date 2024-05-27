import handler from './handler.js';
import AuthHandler from '../middleware/authController.js';

const routeCore = "/api";
const routes = [
    {
        method: 'GET',
        path: routeCore + '/',
        handler: handler.home
    },
    {
        method: 'POST',
        path: routeCore + '/register',
        handler: AuthHandler.register
    },
];

export default routes;