import express = require('express');
import { IRouterConfiguration } from './router-configuration.interface';

export abstract class BaseRouter {
    public readonly routes: any = express.Router();
    protected abstract configurations: IRouterConfiguration[];

    protected configure() {
        this.configurations.forEach((item: any) => {
            if (item.middleware) {
                this.routes[item.type](
                    item.route,
                    item.middleware,
                    item.handler);
            } else {
                this.routes[item.type](
                    item.route,
                    item.handler);
            }
        });
    }
}
