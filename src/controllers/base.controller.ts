import express = require('express');
import Boom = require('boom');
import Joi = require('joi');

export abstract class BaseController {
    protected readonly req: express.Request;
    protected readonly res: express.Response;
    protected readonly next: express.NextFunction;

    protected readonly schema: any;

    constructor(req: express.Request, res: express.Response, next: express.NextFunction) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    public abstract handler(): void;

    protected validate(data: any, schema?: any) {
        return Joi.validate(data, schema || this.schema, (validationError, value) => {
            if (!validationError) {
                return;
            }
            const error: any = Boom.badRequest();
            error.output.payload = {
                error: validationError.details,
                message: validationError.name
            };
            return error;
        });
    }

    protected errorHandler(err: any) {
        if (!err.isBoom) {
            this.next(err);
        }
        this.res.status(err.output.statusCode).send(err.output.payload);
    }
}
