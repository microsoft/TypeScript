//// [asyncFunctionDeclaration5_es6.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

async function foo(await): Promise<void> {
}

//// [asyncFunctionDeclaration5_es6.js]
function foo(await) {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(function* () {
        }()));
    });
}
