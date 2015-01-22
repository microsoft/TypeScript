//// [awaitBindingElement10.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: number;
declare var ar: number[];
declare var pa: Promise<number>;
declare var par: Promise<number[]>;
async function func([ x = await pa ]): Promise<void> {
}


//// [awaitBindingElement10.js]
function func(_a) {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    _b = _a[0];
                    if (!(_b === void 0))
                        return [3 /*break*/, 2];
                    return [4 /*yield*/, pa];
                case 1:
                    _c = _state.sent;
                    return [3 /*break*/, 3];
                case 2:
                    _c = _b;
                    _state.label = 3;
                case 3:
                    x = _c;
                    return [2 /*return*/];
            }
        })));
    });
    var _b, x, _c;
}
