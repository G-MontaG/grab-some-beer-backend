import express = require('express');
import { BaseController } from '../base.controller';

class FoursquareController extends BaseController {
    public handler() {
        this.res.status(200).send('test');
    }
}

export function foursquareHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    const foursquareController = new FoursquareController(req, res, next);
    foursquareController.handler();
}
