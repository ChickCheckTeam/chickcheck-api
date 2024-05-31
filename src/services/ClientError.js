class ClientError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ClientError';
    }
}

class InputError extends ClientError {
    constructor(message) {
        super(message);
        this.name = 'InputError';
    }
}

export { InputError }