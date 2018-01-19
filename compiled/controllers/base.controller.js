"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Boom = require("boom");
const Joi = require("joi");
class BaseController {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }
    validate(data, schema) {
        return Joi.validate(data, schema || this.schema, (validationError, value) => {
            if (!validationError) {
                return;
            }
            const error = Boom.badRequest();
            error.output.payload = {
                error: validationError.details,
                message: validationError.name
            };
            return error;
        });
    }
    errorHandler(err) {
        if (!err.isBoom) {
            this.next(err);
        }
        this.res.status(err.output.statusCode).send(err.output.payload);
    }
}
exports.BaseController = BaseController;
