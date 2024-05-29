import dataService from '../services/dataService.js';
import bcrypt from "bcryptjs";

function isEmail(emailAdress){
    let regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if (emailAdress.match(regex)) {
        return true; 
    }
    return false; 
}

async function register(request, h) {
    // Register logic
    const { name, username, email, password, passwordConfirm } = request.payload;

    if (password !== passwordConfirm) {
        return h.response({
            status: "fail",
            message: 'Password does not match!',
        }).code(401);
    }

    if (isEmail(email) === false) {
        return h.response({
            status: "fail",
            message: 'Please provide a valid email!',
        }).code(401);
    }

    try {
        const users = await dataService.getUsers();
        const user = users.find(user => user.email === email);

        if (user) {
            return h.response({
                status: "fail",
                message: 'User already exists!',
            }).code(401);
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = {
            name,
            username,
            email,
            password: hashedPassword,
        };

        const result = await dataService.createUser(newUser);

        return h.response({
            status: "success",
            message: result.message,
            data: result.data,
        }).code(201);
    } catch (error) {
        return h.response({
            message: error.message,
        }).code(500);
    }
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
            status: "success",
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
                status: "fail",
                message: result.message
            }).code(404);
        }

        delete result.data.password

        return h.response({
            status: "success",
            message: result.message,
            data: result.data
        }).code(200);
    } catch (error) {
        return h.response({
            error
        }).code(400)
    }
}

export default { register, showUsers, showUsersDetail }