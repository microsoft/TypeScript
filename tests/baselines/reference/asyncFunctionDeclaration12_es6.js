//// [asyncFunctionDeclaration12_es6.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

var v = async function await(): Promise<void> { }

//// [asyncFunctionDeclaration12_es6.js]
var v = function await() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(function* () {
        }()));
    });
};
