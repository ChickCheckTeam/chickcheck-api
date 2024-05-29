import dataService from '../services/dataService.js';

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

async function showUsers(request, h) {
    try {
        const users = await dataService.getUsers();
        const result = users.map(user => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            scanHistory: user.scanHistory
        }))
        
        return h.response({
            messages: 'All User Retrieved Successfully',
            data: result
        }).code(200);
    } catch (error) {
        return h.response({ 
            error
        }).code(400)
    }
}

async function showUsersDetail(request, h) {
    try {
        const result = await dataService.getUserById(request.params.id);
        
        if (result.code === 404) {
            return h.response({
                message: result.message
            }).code(404);
        }

        delete result.data.password

        return h.response({
            message: result.message,
            data: result.data
        }).code(200);
    } catch (error) {
        return h.response({
            error
        }).code(400)
    }
}

export default { home, showUsers, showUsersDetail };