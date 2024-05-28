import jwt from "jsonwebtoken";

function isEmail(emailAdress){
    let regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if (emailAdress.match(regex)) {
        return true; 
    }
    return false; 
}

async function register(request, h) {
    // Register logic
    const { username, email, password, passwordConfirm } = request.payload;

    if (password !== passwordConfirm) {
        return h.response({
            message: 'Password does not match!',
        }).code(401);
    }

    if (isEmail(email) === false) {
        return h.response({
            message: 'Please provide a valid email!',
        }).code(401);
    }

    try {
        
    } catch (error) {
        
    }

    return h.response({
        message: 'data retrieved!',
    });
}

async function login(request, h) {
    // Login logic
    const { email, password } = request.body;

    try {
        return h.response({
            data: {
                email,
                password
            },
            message: 'data retrieved!',
        });   
    } catch (error) {
        return error.response(500).code(500).message(500).message;
    }
}

export default { register, login };