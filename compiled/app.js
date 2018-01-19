"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const winston = require("winston");
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: path.resolve('.env') });
}
const api_router_1 = require("./controllers/api/api.router");
class Server {
    constructor() {
        this.app = express();
        this.app.set('port', process.env.PORT || 8000);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        // use ngx_http_gzip_module instead of compression
        this.app.use(helmet());
        this.app.use(cors());
        this.configureRoutes();
        this.configureErrorHandler();
        this.connection = this.app.listen(this.app.get('port'), () => {
            winston.log('info', `Server listening on port ${this.app.get('port')} in ${this.app.get('env')} mode`);
            if (process.send) {
                process.send('ready');
            }
        });
        process.on('SIGINT', this._gracefulShutdown.bind(this));
        process.on('SIGTERM', this._gracefulShutdown.bind(this));
        process.on('uncaughtException', this.uncaughtException.bind(this));
        process.on('unhandledRejection', this.unhandledRejection.bind(this));
    }
    addNamespace(namespace, router) {
        this.app.use(namespace, router);
    }
    configureRoutes() {
        this.addNamespace('/api', api_router_1.apiRouter.routes);
    }
    configureErrorHandler() {
        if (process.env.NODE_ENV === 'production') {
        }
        this.app.use((err, req, res, next) => {
            winston.log('error', `${req.protocol} ${req.method} ${req.originalUrl} [${err.status || err.code}] - ${err.message}`);
            if (err.stack) {
                winston.log('error', err.stack);
            }
            res.status(err.status || 500).send({
                message: err.message || err.name,
                error: err.toString()
            });
        });
    }
    _gracefulShutdown() {
        if (process.env.NODE_ENV === 'development') {
            return process.exit(1);
        }
        winston.log('info', 'Closing server. Get SIGINT/SIGTERM signal');
        const cleanUp = () => {
            return new Promise((resolve) => {
                resolve();
            });
        };
        this.connection.close(() => {
            cleanUp().then(() => {
                winston.log('info', 'Server closed');
                return process.exit();
            }).catch((err) => {
                winston.log('info', 'Server closed with errors');
                winston.log('info', err);
                return process.exit();
            });
        });
        setTimeout(() => {
            cleanUp().then(() => {
                winston.log('warning', 'Server closed forced');
                return process.exit(1);
            }).catch((err) => {
                winston.log('warning', 'Server closed forced with errors');
                winston.log('warning', err);
                return process.exit(1);
            });
        }, 5000);
        setTimeout(() => {
            winston.log('error', 'Server was destroy without closing connection');
            return process.exit(1);
        }, 10000);
        return;
    }
    uncaughtException(err) {
        if (process.env.NODE_ENV === 'production') {
        }
        winston.log('error', err.stack);
        process.exit(1);
    }
    unhandledRejection(err) {
        if (process.env.NODE_ENV === 'production') {
        }
        winston.log('error', err.stack);
        process.exit(1);
    }
}
const server = new Server();
