import express = require('express');
import https = require('https');
import querystring = require('querystring');
import { BaseController } from '../base.controller';

class FoursquareController extends BaseController {
    public handler() {
        const categories = [
            '4bf58dd8d48988d1df931735', // Гриль-бар / Шашлычная
            '5293a7d53cf9994f4e043a45', // Ресторан кавказской кухни
            '52f2ae52bcbc57f1066b8b81', // Чешский ресторан
            '4bf58dd8d48988d155941735', // Гастропаб,
            '4bf58dd8d48988d10d941735', // Немецкий ресторан
            '52e81612bcbc57f1066b7a06', // Ирландский паб
            '5283c7b4e4b094cb91ec88d7', // Ресторан кебабов
            '4bf58dd8d48988d1ca941735', // Пиццерия
            '4bf58dd8d48988d1cc941735', // Стейк-хаус
            '52e81612bcbc57f1066b7a0d', // Пляжный бар
            '56aa371ce4b08b9a8d57356c', // Пивной бар
            '4bf58dd8d48988d117941735', // Пивной сад
            '4bf58dd8d48988d120941735', // Бар-караоке
            '4bf58dd8d48988d11b941735', // Паб
            '50327c8591d4c4b30a586d5d' // Пивоварня
        ].join(',');

        const options = {
            hostname: 'api.foursquare.com',
            path: '/v2/venues/search?' + querystring.stringify(Object.assign({},
                this.req.query,
                {
                    'client_id': process.env.FOURSQUARE_CLIENT_ID,
                    'client_secret': process.env.FOURSQUARE_CLIENT_SECRET,
                    'categoryId': categories
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
