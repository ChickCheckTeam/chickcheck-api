const fetchData = require('../server/handler');

const routes = [
    {
        path: '/predict',
        method: 'POST',
        handler: fetchData,
        options: {
            payload: {
                allow: 'application/json',
            }
        }
    }
]

module.exports = routes;