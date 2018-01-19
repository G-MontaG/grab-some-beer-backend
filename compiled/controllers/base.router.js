"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class BaseRouter {
    constructor() {
        this.routes = express.Router();
    }
    configure() {
        this.configurations.forEach((item) => {
            if (item.middleware) {
                this.routes[item.type](item.route, item.middleware, item.handler);
            }
            else {
                this.routes[item.type](item.route, item.handler);
            }
        });
    }
}
exports.BaseRouter = BaseRouter;
