//// [tests/cases/compiler/contextualTypingOfTooShortOverloads.ts] ////

//// [contextualTypingOfTooShortOverloads.ts]
// small repro from #11875
var use: Overload;
use((req, res) => {});

interface Overload {
    (handler1: (req1: string) => void): void;
    (handler2: (req2: number, res2: number) => void): void;
}
// larger repro from #11875
let app: MyApp;
app.use((err: any, req, res, next) => { return; });


interface MyApp {
    use: IRouterHandler<this> & IRouterMatcher<this>;
}

interface IRouterHandler<T> {
    (...handlers: RequestHandler[]): T;
    (...handlers: RequestHandlerParams[]): T;
}

interface IRouterMatcher<T> {
    (path: PathParams, ...handlers: RequestHandler[]): T;
    (path: PathParams, ...handlers: RequestHandlerParams[]): T;
}

type PathParams = string | RegExp | (string | RegExp)[];
type RequestHandlerParams = RequestHandler | ErrorRequestHandler | (RequestHandler | ErrorRequestHandler)[];

interface RequestHandler {
    (req: Request, res: Response, next: NextFunction): any;
}

interface ErrorRequestHandler {
    (err: any, req: Request, res: Response, next: NextFunction): any;
}

interface Request {
    method: string;
}

interface Response {
    statusCode: number;
}

interface NextFunction {
    (err?: any): void;
}


//// [contextualTypingOfTooShortOverloads.js]
// small repro from #11875
var use;
use(function (req, res) { });
// larger repro from #11875
var app;
app.use(function (err, req, res, next) { return; });
