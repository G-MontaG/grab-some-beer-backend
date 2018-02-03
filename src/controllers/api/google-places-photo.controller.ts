import express = require('express');
import https = require('https');
import querystring = require('querystring');
import { BaseController } from '../base.controller';

class GooglePlacesPhotoController extends BaseController {
    public handler() {
        const options = {
            hostname: 'maps.googleapis.com',
            path: '/maps/api/place/photo?' + querystring.stringify(Object.assign({},
                this.req.query,
                {
                    'maxwidth': '400',
                    'key': process.env.GOOGLE_PLACES_KEY
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

export function googlePlacesPhotoHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    const googlePlacesPhotoController = new GooglePlacesPhotoController(req, res, next);
    googlePlacesPhotoController.handler();
}
