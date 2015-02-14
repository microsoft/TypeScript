//// [awaitTryStatement6.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var p: Promise<void>;
async function func(): Promise<void> {
    "before";
    try {
        "try0";
        await p;
        "try1";
    } catch (e) {
        "catch";
    } finally {        
        "finally";
    }
    "after";
}


//// [awaitTryStatement6.js]
function func() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    _state.trys = [];
                    _state.label = 1;
                case 1:
                    "before";
                    _state.label = 2;
                case 2:
                    _state.trys.push([2, 4, 5, 6]);
                    "try0";
                    return [4 /*yield*/, p];
                case 3:
                    "try1";
                    return [3 /*break*/, 6];
                case 4:
                    _a = _state.error;
                    "catch";
                    return [3 /*break*/, 6];
                case 5:
                    "finally";
                    return [5 /*endfinally*/];
                case 6:
                    "after";
                    return [2 /*return*/];
            }
        })));
    });
    var _a;
}
