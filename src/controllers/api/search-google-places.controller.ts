import express = require('express');
import https = require('https');
import querystring = require('querystring');
import { BaseController } from '../base.controller';

class GooglePlacesController extends BaseController {
    public handler() {
        const options = {
            hostname: 'maps.googleapis.com',
            path: '/maps/api/place/nearbysearch/json?' + querystring.stringify(Object.assign({},
                this.req.query,
                {
                    'key': process.env.GOOGLE_PLACES_KEY,
                }),
                '&', '=', {encodeURIComponent: (s: any) => s}),
            method: 'GET'
        };

        const req = https.request(options, (res) => {
            this.res.writeHead(res.statusCode, res.headers);
            return res.pipe(this.res, {end: true});
        });
        this.req.pipe(req, {end: true});
    }
}

export function googlePlacesHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    const googlePlacesController = new GooglePlacesController(req, res, next);
    googlePlacesController.handler();
}
