"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorController = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    else {
        console.error('ERROR ❌', err);
        res.status(err.statusCode).json({
            status: err.status,
            err: err,
            message: err.message,
            stack: err.stack
        });
    }
};
exports.default = errorController;
//# sourceMappingURL=errorControllers.js.map