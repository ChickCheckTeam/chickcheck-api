import dataService from "../services/dataService.js";
import bcrypt from "bcryptjs";
import jwtToken from "jsonwebtoken";
import dotenv from "dotenv";

const env = dotenv.config().parsed;

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
            message: 'Password does not match!',
        }).code(401);
    }

    if (isEmail(email) === false) {
        return h.response({
            message: 'Please provide a valid email!',
        }).code(401);
    }

    try {
        const users = await dataService.getUsers();
        const user = users.find(user => user.email === email);

        if (user) {
            return h.response({
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
            message: result.message,
            data: result.data,
        }).code(201);
    } catch (error) {
        return h.response({
            message: error.message,
        }).code(500);
    }
}

async function login(request, h) {
    const { email, password } = request.payload;

    if (!email || !password) {
        return h.response({
            message: 'Email and password are required!'
        }).code(400);
    }

    try {
        const users = await dataService.getUsers();
        const user = users.find(user => user.email === email);

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if(user === undefined || isPasswordValid === false) {
            return h.response({
                message: 'Email or Password incorrect!'
            }).code(404);
        }

        const token = jwtToken.sign({ id: user.id }, env.JWT_SECRET)

        return h.response({
            data: {
                id: user.id,
                email,
                password
            },
            token,
            message: 'Login Successful!',
        }).state('session', token).code(200);
    } catch (error) {
        return h.response({
            message: error.message,
        }).code(500);
    }
}

async function logout(request, h) {
    return h.response({
        message: 'Logout Successful!',
    }).unstate('session');
}

export default { register, login, logout };