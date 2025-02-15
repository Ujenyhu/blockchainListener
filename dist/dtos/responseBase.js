"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseBase {
    constructor(statusCode, status, message, data) {
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
exports.default = ResponseBase;
