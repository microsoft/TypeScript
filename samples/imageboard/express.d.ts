///<reference path='../node/node.d.ts' />

declare module "express" {
    import http = require("http");
    function express(): express.ExpressServer;
    module express {
        export function createServer(): ExpressServer;
        export function static(path: string): any;
        export var listen;

        // Connect middleware
        export function bodyParser(options?: any): (req: ExpressServerRequest, res: ExpressServerResponse, next) => void;
        export function errorHandler(opts?: any): (req: ExpressServerRequest, res: ExpressServerResponse, next) => void;
        export function methodOverride(): (req: ExpressServerRequest, res: ExpressServerResponse, next) => void;
        
        export interface ExpressSettings {
            env?: string;
            views?: string;
        }

        export interface ExpressServer {
            set(name: string): any;
            set(name: string, val: any): any;
            enable(name: string): ExpressServer;
            disable(name: string): ExpressServer;
            enabled(name: string): boolean;
            disabled(name: string): boolean;
            configure(env: string, callback: () => void ): ExpressServer;
            configure(env: string, env2: string, callback: () => void ): ExpressServer;
            configure(callback: () => void ): ExpressServer;
            settings: ExpressSettings;
            engine(ext: string, callback: any): void;
            param(param: Function): ExpressServer;
            param(name: string, callback: Function): ExpressServer;
            param(name: string, expressParam: any): ExpressServer;
            param(name: any[], callback: Function): ExpressServer;
            get(name: string): any;
            get(path: string, handler: (req: ExpressServerRequest, res: ExpressServerResponse) => void ): void;
            get(path: RegExp, handler: (req: ExpressServerRequest, res: ExpressServerResponse) => void ): void;
            get(path: string, callbacks: any, callback: () => void ): void;
            post(path: string, handler: (req: ExpressServerRequest, res: ExpressServerResponse) => void ): void;
            post(path: RegExp, handler: (req: ExpressServerRequest, res: ExpressServerResponse) => void ): void;
            post(path: string, callbacks: any, callback: () => void ): void;
            all(path: string, callback: Function): void;
            all(path: string, callback: Function, callback2: Function): void;
            locals: any;
            render(view: string, callback: (err: Error, html) => void ): void;
            render(view: string, opts: any, callback: (err: Error, html) => void ): void;
            routes: any;
            listen(port: number, hostname: string, backlog: number, callback: Function): void;
            listen(port: number, callback: Function): void;
            listen(path: string, callback?: Function): void;
            listen(handle: any, listeningListener?: Function): void;
            use(route: string, callback: Function): ExpressServer;
            use(route: string, server: ExpressServer): ExpressServer;
            use(callback: Function): ExpressServer;
            use(server: ExpressServer): ExpressServer;
        }
        
        export class ExpressServerRequest extends http.ServerRequest {
            params: any;
            query: any;
            body: any;
            files: any;
            param(name: string): any;
            route: any;
            cookies: any;
            signedCookies: any;
            get(field: string): string;
            accepts(types: string): any;
            accepts(types: string[]): any;
            accepted: any;
            is(type: string): boolean;
            ip: string;
            ips: string[];
            path: string;
            host: string;
            fresh: boolean;
            stale: boolean;
            xhr: boolean;
            protocol: string;
            secure: boolean;
            subdomains: string[];
            acceptedLanguages: string[];
            acceptedCharsets: string[];
            acceptsCharset(charset: string): boolean;
            acceptsLanguage(lang: string): boolean;
        }
        
        export class ExpressServerResponse extends http.ServerResponse {
            status(code: number): any;
            set(field: any): void;
            set(field: string, value: string): void;
            header(field: any): void;
            header(field: string, value: string): void;
            get(field: string): any;
            cookie(name: string, value: any, options?: any): void;
            clearcookie(name: string, options?: any): void;
            redirect(status: number, url: string): void;
            redirect(url: string): void;
            charset: string;
            send(bodyOrStatus: any);
            send(body: any, status: any);
            send(body: any, headers: any, status: number);
            json(bodyOrStatus: any);
            json(body: any, status: any);
            json(body: any, headers: any, status: number);
            jsonp(bodyOrStatus: any);
            jsonp(body: any, status: any);
            jsonp(body: any, headers: any, status: number);
            type(type: string): void;
            format(object: any): void;
            attachment(filename?: string);
            sendfile(path: string): void;
            sendfile(path: string, options: any): void;
            sendfile(path: string, options: any, fn: (err: Error) => void ): void;
            download(path: string): void;
            download(path: string, filename: string): void;
            download(path: string, filename: string, fn: (err: Error) => void ): void;
            links(links: any): void;
            locals: any;
            render(view: string, locals: any): void;
            render(view: string, callback: (err: Error, html: any) => void ): void;
            render(view: string, locals: any, callback: (err: Error, html: any) => void ): void;
        }
    }
    export = express;
}
