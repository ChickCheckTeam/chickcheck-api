import authController from '../middleware/authController.js';
import userController from '../middleware/userController.js';
import globalHandler from '../middleware/globalController.js';
import scanController from '../middleware/scanController.js';
import articleController from '../middleware/articleController.js';

const routeCore = "/api";

const routes = [
    // authentication
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
        path: routeCore + '/profile',
        method: 'GET',
        handler: authController.profile,
    },
    {
        path: routeCore + '/logout',
        method: 'POST',
        handler: authController.logout,
    },

    // home
    {
        path: routeCore + '/',
        method: 'GET',
        handler: globalHandler.home,
    },
    
    // user fetching
    {
        path: routeCore + '/user',
        method: 'GET',
        handler: userController.showUsers
    },
    {
        path: routeCore + '/user/{id}',
        method: 'GET',
        handler: userController.showUsersDetail
    },
    {
        path: routeCore + '/register',
        method: 'POST',
        handler: userController.register,
        options: {
            auth: false,
            payload: {
                allow: 'application/json',
            }
        }
    },

    // scan fetching
    {
        path: routeCore + '/scan',
        method: 'POST',
        handler: scanController.storeScan,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
            }
        }
    },
    
    //article fetching
    {
        path: routeCore + '/article',
        method: 'GET',
        handler: articleController.getArticles
    },
    {
        path: routeCore + '/article',
        method: 'POST',
        handler: articleController.storeArticle,
        options: {
            payload: {
                allow: 'application/json',
            }
        }
    },
    {
        path: routeCore + '/article/{id}',
        method: 'GET',
        handler: articleController.getArticleById
    },
    {
        path: routeCore + '/article/{id}',
        method: 'PUT',
        handler: articleController.updateArticle,
        options: {
            payload: {
                allow: 'application/json',
            }
        }
    },
    {
        path: routeCore + '/article/{id}',
        method: 'DELETE',
        handler: articleController.deleteArticle
    },
]

export default routes;