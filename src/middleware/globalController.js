async function home(request, h) {
    try {
        return h.response({
            message: 'Hello World!'
        })
    } catch (err) {
        return h.response({
            message: err.message
        }).code(500);
    }
}

async function getBuckets(request, h) {

    return h.response({
        message: 'Hello World!',
    })
}

export default { home, getBuckets };