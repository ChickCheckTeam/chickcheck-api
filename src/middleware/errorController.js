import ClientError from "/services/ClientError.js"

class ErrorController {
    async handle(err, req, res, next) {
      // Log the error for debugging purposes
      console.error(err.stack);
  
      let statusCode = err.status || 500;
      let message = err.message || 'Internal Server Error';
  
      
      res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
      });
    }
  }
  
export default {ErrorController}
