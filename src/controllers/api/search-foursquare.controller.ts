import express = require('express');
import https = require('https');
import { BaseController } from '../base.controller';

class FoursquareController extends BaseController {
    public handler() {
        const options = {
            hostname: 'api.foursquare.com',
            port: 443,
            path: `/v2/venues/search?client_id=${process.env.FOURSQUARE_CLIENT_ID}&client_secret=${process.env.FOURSQUARE_CLIENT_SECRET}&v=20171101&ll=50.024628,36.365108&radius=500`,
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
