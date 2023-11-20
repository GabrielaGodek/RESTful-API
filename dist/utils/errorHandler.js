"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusCode = void 0;
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["OK"] = 200] = "OK";
    HttpStatusCode[HttpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatusCode[HttpStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatusCode[HttpStatusCode["INTERNAL_SERVER"] = 500] = "INTERNAL_SERVER";
})(HttpStatusCode || (exports.HttpStatusCode = HttpStatusCode = {}));
class ErrorHandler extends Error {
    constructor(name, httpCode, isOperational, description) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}
exports.default = ErrorHandler;
//# sourceMappingURL=errorHandler.js.map