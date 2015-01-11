//// [awaitArrayLiteral1.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: number;
declare var p: Promise<number>;
async function func(): Promise<void> {
    var b = [a, a, a];
}


//// [awaitArrayLiteral1.js]
function func() {
    var b;
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            b = [a, a, a];
            return ["return"];
        })));
    });
}
