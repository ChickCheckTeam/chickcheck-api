import jwt from "jsonwebtoken";

async function register(req, res) {
    // Register logic
    const { username, email, telp, password, passwordConfirm } = req.body;

    return req.body;

    return {
        data: {
            username,
            email,
            telp,
            password,
            passwordConfirm
        },
        message: 'data retrieved!',
    };
}

export default { register }