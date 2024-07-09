//// [tests/cases/compiler/augmentExportEquals5.ts] ////

//// [express.d.ts]
declare module Express {
    export interface Request { }
    export interface Response { }
    export interface Application { }
}

declare module "express" {
    function e(): e.Express;
    namespace e {
        interface IRoute {
            all(...handler: RequestHandler[]): IRoute;
        }

        interface IRouterMatcher<T> {
            (name: string|RegExp, ...handlers: RequestHandler[]): T;
        }

        interface IRouter<T> extends RequestHandler {
            route(path: string): IRoute;
        }

        export function Router(options?: any): Router;

        export interface Router extends IRouter<Router> {}

        interface Errback { (err: Error): void; }

        interface Request extends Express.Request {

            get (name: string): string;
        }

        interface Response extends Express.Response {
            charset: string;
        }

        interface ErrorRequestHandler {
            (err: any, req: Request, res: Response, next: Function): any;
        }

        interface RequestHandler {
            (req: Request, res: Response, next: Function): any;
        }

        interface Handler extends RequestHandler {}

        interface RequestParamHandler {
            (req: Request, res: Response, next: Function, param: any): any;
        }

        interface Application extends IRouter<Application>, Express.Application {
            routes: any;
        }

        interface Express extends Application {
            createApplication(): Application;
        }

        var static: any;
    }

    export = e;
}

//// [augmentation.ts]
/// <reference path="express.d.ts"/>
import * as e from "express";
declare module "express" {
    interface Request {
        id: number;
    }
}

//// [consumer.ts]
import { Request } from "express";
import "./augmentation";
let x: Request;
const y = x.id;

//// [augmentation.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//// [consumer.js]
define(["require", "exports", "./augmentation"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var x;
    var y = x.id;
});
