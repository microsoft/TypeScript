//// [awaitForStatement4.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var p: Promise<number>;
async function func(): Promise<void> {
    "before";
    for (var i = 0; i < await p; i++) {
        "body";
    }
    "after";
}

//// [awaitForStatement4.js]
function func() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    "before";
                    i = 0;
                    _state.label = 1;
                case 1:
                    _a = i;
                    return [4 /*yield*/, p];
                case 2:
                    if (!(_a < _state.sent))
                        return [3 /*break*/, 4];
                    "body";
                    _state.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    "after";
                    return [2 /*return*/];
            }
        })));
    });
    var i, _a;
}
