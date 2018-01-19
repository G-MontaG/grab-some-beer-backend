"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const querystring = require("querystring");
const base_controller_1 = require("../base.controller");
class FoursquareController extends base_controller_1.BaseController {
    handler() {
        const categories = [
            '4bf58dd8d48988d1df931735',
            '5293a7d53cf9994f4e043a45',
            '52f2ae52bcbc57f1066b8b81',
            '4bf58dd8d48988d155941735',
            '4bf58dd8d48988d10d941735',
            '52e81612bcbc57f1066b7a06',
            '5283c7b4e4b094cb91ec88d7',
            '4bf58dd8d48988d1ca941735',
            '4bf58dd8d48988d1cc941735',
            '52e81612bcbc57f1066b7a0d',
            '56aa371ce4b08b9a8d57356c',
            '4bf58dd8d48988d117941735',
            '4bf58dd8d48988d120941735',
            '4bf58dd8d48988d11b941735',
            '50327c8591d4c4b30a586d5d' // Пивоварня
        ].join(',');
        const options = {
            hostname: 'api.foursquare.com',
            path: '/v2/venues/search?' + querystring.stringify(Object.assign({}, this.req.query, {
                'client_id': process.env.FOURSQUARE_CLIENT_ID,
                'client_secret': process.env.FOURSQUARE_CLIENT_SECRET,
                'categoryId': categories
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
function foursquareHandler(req, res, next) {
    const foursquareController = new FoursquareController(req, res, next);
    foursquareController.handler();
}
exports.foursquareHandler = foursquareHandler;
