async function home(request, h) {
    const sesi = request.state.session;
    const cookie = request.headers.authorization;
    
    console.log(sesi)
    try {
        
        return test;
    } catch (error) {
        
    }
    return h.response({
        message: 'Hello World!'
    })
}

export default { home };