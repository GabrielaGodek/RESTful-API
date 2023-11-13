"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusCode = void 0;
function statusCode(originalUrl) {
    if (originalUrl.startsWith('/unauthorized')) {
        return 401;
    }
    else if (originalUrl.startsWith('/payment-required')) {
        return 402;
    }
    else {
        return 404;
    }
}
exports.statusCode = statusCode;
//# sourceMappingURL=resStatusCode.js.map