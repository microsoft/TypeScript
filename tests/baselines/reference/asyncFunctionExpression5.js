//// [asyncFunctionExpression5.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

var foo = async function (await): Promise<void> {
}

//// [asyncFunctionExpression5.js]
var foo = , await, Promise = {};
