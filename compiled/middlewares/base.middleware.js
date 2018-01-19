"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseMiddleware {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }
    errorHandler(err) {
        if (!err.isBoom) {
            this.next(err);
        }
        this.res.status(err.output.statusCode).send(err.output.payload);
    }
}
exports.BaseMiddleware = BaseMiddleware;
