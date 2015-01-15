//// [asyncFunctionDeclaration15.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

export async function foo(): Promise<void> {
  var Promise;
}

//// [asyncFunctionDeclaration15.js]
function foo() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            return ["return"];
        })));
    });
    var Promise;
}
exports.foo = foo;
