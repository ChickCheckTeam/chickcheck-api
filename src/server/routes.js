import authController from '../middleware/authController.js';
import handler from './handler.js';

const routeCore = "/api";

const routes = [
    {
        path: routeCore + '/',
        method: 'GET',
        handler: handler.home,
    },
    {
        path: routeCore + '/login',
        method: 'POST',
        handler: authController.login,
        options: {
            auth: false,
            payload: {
                allow: 'application/json',
            }
        }
    },
    {
        path: routeCore + '/logout',
        method: 'POST',
        handler: authController.logout,
    },
    
    {
        path: routeCore + '/user',
        method: 'GET',
        handler: handler.showUsers
    },
    {
        path: routeCore + '/user/{id}',
        method: 'GET',
        handler: handler.showUsersDetail
    },
    {
        path: routeCore + '/register',
        method: 'POST',
        handler: authController.register,
        options: {
            auth: false,
            payload: {
                allow: 'application/json',
            }
        }
    },
    
    //article fetching
    {
        path: routeCore + '/article',
        method: 'GET',
        handler: handler.showArticles
    }
]

export default routes;