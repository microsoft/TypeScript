//// [tests/cases/compiler/declarationEmitPrivatePromiseLikeInterface.ts] ////

//// [http-client.ts]
type TPromise<ResolveType, RejectType = any> = Omit<Promise<ResolveType>, "then" | "catch"> & {
    then<TResult1 = ResolveType, TResult2 = never>(
        onfulfilled?: ((value: ResolveType) => TResult1 | PromiseLike<TResult1>) | undefined | null,
        onrejected?: ((reason: RejectType) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): TPromise<TResult1 | TResult2, RejectType>;
    catch<TResult = never>(
        onrejected?: ((reason: RejectType) => TResult | PromiseLike<TResult>) | undefined | null,
    ): TPromise<ResolveType | TResult, RejectType>;
};

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
}

export class HttpClient<SecurityDataType = unknown> {
    public request = <T = any, E = any>(): TPromise<HttpResponse<T, E>> => {
        return '' as any;
    };
}
//// [Api.ts]
import { HttpClient } from "./http-client";

export class Api<SecurityDataType = unknown> {
    constructor(private http: HttpClient<SecurityDataType>) { }

    abc1 = () => this.http.request();
    abc2 = () => this.http.request();
    abc3 = () => this.http.request();
}

//// [http-client.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
var HttpClient = /** @class */ (function () {
    function HttpClient() {
        this.request = function () {
            return '';
        };
    }
    return HttpClient;
}());
exports.HttpClient = HttpClient;
//// [Api.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
var Api = /** @class */ (function () {
    function Api(http) {
        var _this = this;
        this.http = http;
        this.abc1 = function () { return _this.http.request(); };
        this.abc2 = function () { return _this.http.request(); };
        this.abc3 = function () { return _this.http.request(); };
    }
    return Api;
}());
exports.Api = Api;


//// [http-client.d.ts]
type TPromise<ResolveType, RejectType = any> = Omit<Promise<ResolveType>, "then" | "catch"> & {
    then<TResult1 = ResolveType, TResult2 = never>(onfulfilled?: ((value: ResolveType) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: RejectType) => TResult2 | PromiseLike<TResult2>) | undefined | null): TPromise<TResult1 | TResult2, RejectType>;
    catch<TResult = never>(onrejected?: ((reason: RejectType) => TResult | PromiseLike<TResult>) | undefined | null): TPromise<ResolveType | TResult, RejectType>;
};
export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
}
export declare class HttpClient<SecurityDataType = unknown> {
    request: <T = any, E = any>() => TPromise<HttpResponse<T, E>>;
}
export {};
