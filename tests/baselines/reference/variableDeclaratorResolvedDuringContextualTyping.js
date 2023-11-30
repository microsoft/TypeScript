//// [tests/cases/compiler/variableDeclaratorResolvedDuringContextualTyping.ts] ////

//// [variableDeclaratorResolvedDuringContextualTyping.ts]
module WinJS {
    export interface ValueCallback {
        (value: any): any;
    }

    export interface EventCallback {
        (value: any): void;
    }

    export interface ErrorCallback {
        (error: any): any;
    }

    export interface ProgressCallback {
        (progress: any): any;
    }

    export declare class Promise {
        constructor(init: (complete: ValueCallback, error: ErrorCallback, progress: ProgressCallback) => void, oncancel?: any);

        static as(value: any): Promise;
        static join(promises: { [name: string]: Promise; }): Promise;
        static join(promises: Promise[]): Promise;
        static any(promises: Promise[]): Promise;
        static timeout(delay: number): Promise;
        static wrapError(error: any): Promise;
        static is(value: any): boolean;
        static addEventListener(type: string, fn: EventCallback);

        public then(success?: ValueCallback, error?: ErrorCallback, progress?: ProgressCallback): Promise;
        public done(success?: ValueCallback, error?: ErrorCallback, progress?: ProgressCallback): void;
        public cancel(): void;
    }

    export declare class TPromise<V> {

        constructor(init: (complete: (value: V) => void, error: (err: any) => void, progress: ProgressCallback) => void, oncancel?: any);

        public then<U>(success?: (value: V) => TPromise<U>, error?: (err: any) => TPromise<U>, progress?: ProgressCallback): TPromise<U>;
        public then<U>(success?: (value: V) => TPromise<U>, error?: (err: any) => U, progress?: ProgressCallback): TPromise<U>;
        public then<U>(success?: (value: V) => U, error?: (err: any) => TPromise<U>, progress?: ProgressCallback): TPromise<U>;
        public then<U>(success?: (value: V) => U, error?: (err: any) => U, progress?: ProgressCallback): TPromise<U>;

        public done(success?: (value: V) => void, error?: (err: any) => any, progress?: ProgressCallback): void;
        public cancel(): void;

        public static as<ValueType>(value: ValueType): TPromise<ValueType>;
        public static timeout(delay: number): TPromise<void>;
        public static join<ValueType>(promises: TPromise<ValueType>[]): TPromise<ValueType[]>;
        public static any<ValueType>(promises: TPromise<ValueType>[]): TPromise<ValueType>;
        public static wrapError<ValueType>(error: any): TPromise<ValueType>;
    }

    export interface IXHROptions {
        type?: string;
        url?: string;
        user?: string;
        password?: string;
        responseType?: string;
        headers?: any;
        customRequestInitializer?: (req: any) => void;
        data?: any;
    }
}

module Services {
    export interface IRequestService {
        /**
         * Returns the URL that can be used to access the provided service. The optional second argument can
         * be provided to narrow down the request URL to a specific file system resource. The third argument
         * allows to specify to return a fully absolute server URL. 
         */
        getRequestUrl(service: string, path?: string): string;
        getRequestUrl(service: string, path?: string, absolute?: boolean): string;

        /**
         * Wraps the call into WinJS.XHR to allow for mocking and telemetry. Use this instead
         * of calling WinJS.XHR directly.
         */
        makeRequest(options: WinJS.IXHROptions): WinJS.Promise;
    }
}

module Errors {
    export class ConnectionError /* extends Error */ {
        constructor(request: XMLHttpRequest) {
        }
    }
}

module Files {
    export interface IUploadResult {
        stat: string;
        isNew: boolean;
    }
}

interface XMLHttpRequest {
    status: number;
    responseText: string;
    statusText: string;

}

class FileService {
    private requestService: Services.IRequestService;
    public uploadData(): WinJS.TPromise<Files.IUploadResult> {
        var path = "";
        return this.requestService.makeRequest({
            url: this.requestService.getRequestUrl('root', path),
            type: 'POST',
            headers: {},
            data: "someData"
        }).then((response: XMLHttpRequest) => {
                var result: IUploadResult = { // This should be error
                    stat: this.jsonToStat(newFilePath, "someString"), // _this needs to be emitted to the js file
                    isNew: response.status === 201
                };

                return WinJS.TPromise.as<Files.IUploadResult>(result);
            }, (xhr: XMLHttpRequest) => {
                return WinJS.Promise.wrapError(new Errors.ConnectionError(xhr));
            });
    }
}

//// [variableDeclaratorResolvedDuringContextualTyping.js]
var WinJS;
(function (WinJS) {
})(WinJS || (WinJS = {}));
var Errors;
(function (Errors) {
    var ConnectionError /* extends Error */ = /** @class */ (function () {
        function ConnectionError(request) {
        }
        return ConnectionError;
    }());
    Errors.ConnectionError = ConnectionError;
})(Errors || (Errors = {}));
var FileService = /** @class */ (function () {
    function FileService() {
    }
    FileService.prototype.uploadData = function () {
        var _this = this;
        var path = "";
        return this.requestService.makeRequest({
            url: this.requestService.getRequestUrl('root', path),
            type: 'POST',
            headers: {},
            data: "someData"
        }).then(function (response) {
            var result = {
                stat: _this.jsonToStat(newFilePath, "someString"), // _this needs to be emitted to the js file
                isNew: response.status === 201
            };
            return WinJS.TPromise.as(result);
        }, function (xhr) {
            return WinJS.Promise.wrapError(new Errors.ConnectionError(xhr));
        });
    };
    return FileService;
}());
