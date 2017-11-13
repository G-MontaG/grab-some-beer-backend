import { IRouterConfiguration } from '../router-configuration.interface';
import { BaseRouter } from '../base.router';
import { foursquareHandler } from './foursquare.controller';

class ApiRouter extends BaseRouter {
    protected readonly configurations: IRouterConfiguration[] = [
        {
            type: 'get',
            route: '/search-foursquare',
            handler: foursquareHandler
        },
    ];

    constructor() {
        super();
        this.configure();
    }
}

export const apiRouter = new ApiRouter();
