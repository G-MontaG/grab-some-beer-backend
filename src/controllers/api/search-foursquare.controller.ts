import express = require('express');
import https = require('https');
import querystring = require('querystring');
import { BaseController } from '../base.controller';

class FoursquareController extends BaseController {
    public handler() {
        const options = {
            hostname: 'api.foursquare.com',
            path: '/v2/venues/search?' + querystring.stringify(Object.assign({},
                this.req.query,
                {
                    'client_id': process.env.FOURSQUARE_CLIENT_ID,
                    'client_secret': process.env.FOURSQUARE_CLIENT_SECRET
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

export function foursquareHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    const foursquareController = new FoursquareController(req, res, next);
    foursquareController.handler();
}
