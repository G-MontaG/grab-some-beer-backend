import { IRouterConfiguration } from '../router-configuration.interface';
import { BaseRouter } from '../base.router';
import { foursquareHandler } from './search-foursquare.controller';
import { googlePlacesHandler } from './search-google-places.controller';
import { facebookPlacesHandler } from './search-facebook-places.controller';

class ApiRouter extends BaseRouter {
    protected readonly configurations: IRouterConfiguration[] = [
        {
            type: 'get',
            route: '/search-foursquare',
            handler: foursquareHandler
        },
        {
            type: 'get',
            route: '/search-google-places',
            handler: googlePlacesHandler
        },
        {
            type: 'get',
            route: '/search-facebook-places',
            handler: facebookPlacesHandler
        },
    ];

    constructor() {
        super();
        this.configure();
    }
}

export const apiRouter = new ApiRouter();
