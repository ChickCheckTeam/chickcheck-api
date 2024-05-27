import jwt from "jsonwebtoken";

async function register(req, res) {
    // Register logic
    const { username, email, telp, password, passwordConfirm } = req.body;

    return {
        message: 'data retrieved!',
    };
}

export default { register }