"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const querystring = require("querystring");
const base_controller_1 = require("../base.controller");
class GooglePlacesPhotoController extends base_controller_1.BaseController {
    handler() {
        const options = {
            hostname: 'maps.googleapis.com',
            path: '/maps/api/place/photo?' + querystring.stringify(Object.assign({}, this.req.query, {
                'maxwidth': '400',
                'key': process.env.GOOGLE_PLACES_KEY
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
function googlePlacesPhotoHandler(req, res, next) {
    const googlePlacesPhotoController = new GooglePlacesPhotoController(req, res, next);
    googlePlacesPhotoController.handler();
}
exports.googlePlacesPhotoHandler = googlePlacesPhotoHandler;
