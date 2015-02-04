//// [asyncFunctionExpression9.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

var foo = async function (a = await => await): Promise<void> {
}

//// [asyncFunctionExpression9.js]
var foo = function (a) {
    if (a === void 0) { a = function (await) { return await; }; }
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            return [2 /*return*/];
        })));
    });
};
