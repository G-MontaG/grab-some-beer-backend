import express = require('express');
import https = require('https');
import querystring = require('querystring');
import { BaseController } from '../base.controller';

class GooglePlacesMapController extends BaseController {
    public handler() {
        const options = {
            hostname: 'maps.googleapis.com',
            path: '/maps/api/js?' + querystring.stringify(Object.assign({},
                this.req.query,
                {
                    'v': '3.exp',
                    'libraries': 'geometry,drawing,places',
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

export function googlePlacesMapHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    const googlePlacesMapController = new GooglePlacesMapController(req, res, next);
    googlePlacesMapController.handler();
}
