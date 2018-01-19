"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const querystring = require("querystring");
const base_controller_1 = require("../base.controller");
class FacebookPlacesController extends base_controller_1.BaseController {
    handler() {
        const options = {
            hostname: 'graph.facebook.com',
            path: '/v2.11/search?' + querystring.stringify(Object.assign({}, this.req.query, {
                'type': 'place',
                'access_token': `${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`,
            }), '&', '=', { encodeURIComponent: (s) => s }),
            method: 'GET'
        };
        const req = https.request(options, (res) => {
            this.res.writeHead(res.statusCode, res.headers);
            return res.pipe(this.res, { end: true });
        });
        this.req.pipe(req, { end: true });
    }
}
function facebookPlacesHandler(req, res, next) {
    const facebookPlacesController = new FacebookPlacesController(req, res, next);
    facebookPlacesController.handler();
}
exports.facebookPlacesHandler = facebookPlacesHandler;
