import express = require('express');
import { BaseController } from '../base.controller';

class GooglePlacesController extends BaseController {
    public handler() {
        this.res.status(200).send(process.env.GOOGLE_PLACES_KEY);
    }
}

export function googlePlacesHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    const googlePlacesController = new GooglePlacesController(req, res, next);
    googlePlacesController.handler();
}
