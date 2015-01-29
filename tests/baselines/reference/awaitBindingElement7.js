//// [awaitBindingElement7.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: number;
declare var ar: number[];
declare var pa: Promise<number>;
declare var par: Promise<number[]>;
async function func([ x ] = ar): Promise<void> {
}


//// [awaitBindingElement7.js]
function func(_a) {
    var x = (_a === void 0 ? ar : _a)[0];
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            return [2 /*return*/];
        })));
    });
}
