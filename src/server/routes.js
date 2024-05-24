import handler from './handler.js';

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: handler.home
    }
];

export default routes;