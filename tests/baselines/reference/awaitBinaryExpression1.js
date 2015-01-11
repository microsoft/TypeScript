//// [awaitBinaryExpression1.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: boolean;
declare var p: Promise<boolean>;
async function func(): Promise<void> {
    "before";
    var b = a && a;
    "after";
}

//// [awaitBinaryExpression1.js]
function func() {
    var b;
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            "before";
            b = a && a;
            "after";
            return ["return"];
        })));
    });
}
