import jwt from "jsonwebtoken";

export function authCheck(header) {
    const { id } = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
    return id;
}