import dataService from "../services/dataService.js";
import { authCheck } from "./authCheck.js";
import jwtToken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

const env = dotenv.config().parsed;

async function login(request, h) {
    const { email, password } = request.payload;

    if (!email || !password) {
        return h.response({
            status: "fail",
            message: 'Email and password are required!'
        }).code(400);
    }

    try {
        const users = await dataService.getUsers();
        const user = users.find(user => user.email === email);

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if(user === undefined || isPasswordValid === false) {
            return h.response({
                status: "fail",
                message: 'Email or Password incorrect!'
            }).code(404);
        }

        const token = jwtToken.sign({ id: user.id }, env.JWT_SECRET)

        return h.response({
            status: "success",
            message: 'Login Successful!',
            token,
        }).state('session', token).code(200);
    } catch (error) {
        return h.response({
            message: error.message,
        }).code(500);
    }
}

async function logout(request, h) {
    return h.response({
        status: "success",
        message: 'Logout Successful!',
    }).unstate('session');
}

async function profile(request, h) {
    const id = authCheck(request.headers.authorization);
    const users = await dataService.getUserById(id);

    if(users.code === 404) {
        return h.response({
            status: "fail",
            message: 'User not found!'
        }).code(404);
    }

    delete users.data.password;

    return h.response({
        status: "success",
        data: users.data,
    });
}

export default { login, logout, profile };