"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_router_1 = require("../base.router");
const search_foursquare_controller_1 = require("./search-foursquare.controller");
const search_google_places_controller_1 = require("./search-google-places.controller");
const search_facebook_places_controller_1 = require("./search-facebook-places.controller");
const google_places_photo_controller_1 = require("./google-places-photo.controller");
const google_places_map_controller_1 = require("./google-places-map.controller");
class ApiRouter extends base_router_1.BaseRouter {
    constructor() {
        super();
        this.configurations = [
            {
                type: 'get',
                route: '/search-foursquare',
                handler: search_foursquare_controller_1.foursquareHandler
            },
            {
                type: 'get',
                route: '/search-google-places',
                handler: search_google_places_controller_1.googlePlacesHandler
            },
            {
                type: 'get',
                route: '/search-facebook-places',
                handler: search_facebook_places_controller_1.facebookPlacesHandler
            },
            {
                type: 'get',
                route: '/google-places-photo',
                handler: google_places_photo_controller_1.googlePlacesPhotoHandler
            },
            {
                type: 'get',
                route: '/google-places-map',
                handler: google_places_map_controller_1.googlePlacesMapHandler
            },
        ];
        this.configure();
    }
}
exports.apiRouter = new ApiRouter();
