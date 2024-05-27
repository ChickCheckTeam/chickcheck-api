import fetchData from ('../server/handler.js');

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

export default routes;