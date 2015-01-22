//// [awaitNewExpression1.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: boolean;
declare var p: Promise<boolean>;
declare var fn: { new(arg0: boolean, arg1: boolean, arg2: boolean): void; };
declare var o: { fn: { new (arg0: boolean, arg1: boolean, arg2: boolean): void; }; };
declare var pfn: Promise<{ new(arg0: boolean, arg1: boolean, arg2: boolean): void; }>;
declare var po: Promise<{ fn: { new (arg0: boolean, arg1: boolean, arg2: boolean): void; }; }>;
async function func(): Promise<void> {
    "before";
    var b = new fn(a, a, a);
    "after";
}

//// [awaitNewExpression1.js]
function func() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            "before";
            b = new fn(a, a, a);
            "after";
            return [2 /*return*/];
        })));
    });
    var b;
}
