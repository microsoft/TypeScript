//// [awaitBinaryExpression13.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: boolean;
declare var p: Promise<boolean>;
declare var o: { [key: string]: boolean; }
async function func(): Promise<void> {
    "before";
    o["b"] = await p;
    "after";
}

//// [awaitBinaryExpression13.js]
function func() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    "before";
                    _a = o;
                    _b = "b";
                    return [4 /*yield*/, p];
                case 1:
                    _a[_b] = _state.sent;
                    "after";
                    return [2 /*return*/];
            }
        })));
    });
    var _a, _b;
}
