//// [awaitForInStatement8.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: any;
declare var o: { i: any };
declare var p: Promise<any>;
async function func(): Promise<void> {
    "before";
    for (o.i in a) {
        "body1";
        await p;
        "body2";
    }
    "after";
}

//// [awaitForInStatement8.js]
function func() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    "before";
                    _a = [];
                    _c = a;
                    for (_b in _c)
                        _a[_a.length] = _b;
                    _b = 0;
                    _state.label = 1;
                case 1:
                    if (!(_b < _a.length))
                        return [3 /*break*/, 4];
                    if (!(_a[_b] in _c))
                        return [3 /*break*/, 3];
                    o.i = _a[_b];
                    "body1";
                    return [4 /*yield*/, p];
                case 2:
                    "body2";
                    _state.label = 3;
                case 3:
                    _b++;
                    return [3 /*break*/, 1];
                case 4:
                    "after";
                    return [2 /*return*/];
            }
        })));
    });
    var _a, _b, _c;
}
