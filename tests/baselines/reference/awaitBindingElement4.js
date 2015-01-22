//// [awaitBindingElement4.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: number;
declare var o: { x: number; };
declare var pa: Promise<number>;
declare var po: Promise<{x: number;}>;
async function func({ x = a }): Promise<void> {
}


//// [awaitBindingElement4.js]
function func(_a) {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            _b = _a.x, x = _b === void 0 ? a : _b;
            return [2 /*return*/];
        })));
    });
    var _b, x;
}
