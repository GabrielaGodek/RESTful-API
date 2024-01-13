import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import ErrorHandler, { HttpStatusCode } from '../utils/errorHandler'

const errorController: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    } else {
        console.error('ERROR ❌', err)
        res.status(err.statusCode).json({
            status: err.status,
            err: err,
            message: err.message,
            stack: err.stack
        })
    }
}

export default errorController