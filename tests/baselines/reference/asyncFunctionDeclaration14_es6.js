//// [asyncFunctionDeclaration14_es6.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

async function foo(): Promise<void> {
  return;
}

//// [asyncFunctionDeclaration14_es6.js]
function foo() {
    return new Promise(__resolve => {
        __resolve(__awaiter(function* () {
        }()));
    });
}
