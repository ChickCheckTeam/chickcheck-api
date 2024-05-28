import authController from '../middleware/authController.js';
import handler from './handler.js';

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
        handler: authController.register,
        options: {
            payload: {
                allow: 'application/json',
            }
        }
    },
    // user routes
    {
        path: routeCore + '/user',
        method: 'GET',
        handler: handler.getUsers
    },
    {
        path: routeCore + '/user/{id}',
        method: 'GET',
        handler: handler.getUserDetail
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