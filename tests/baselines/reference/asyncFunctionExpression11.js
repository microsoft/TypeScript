//// [asyncFunctionExpression11.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

var v = async function await(): Promise<void> { }

//// [asyncFunctionExpression11.js]
var v = , await = function () { };
