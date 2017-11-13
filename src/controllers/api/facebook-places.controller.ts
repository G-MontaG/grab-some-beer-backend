import express = require('express');
import { BaseController } from '../base.controller';

class FacebookPlacesController extends BaseController {
    public handler() {
        this.res.status(200).send(process.env.FACEBOOK_APP_ID);
    }
}

export function facebookPlacesHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    const facebookPlacesController = new FacebookPlacesController(req, res, next);
    facebookPlacesController.handler();
}
