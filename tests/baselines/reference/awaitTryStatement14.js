//// [awaitTryStatement14.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var p: Promise<void>;
async function func(): Promise<void> {
    "before";
    try {
        "try0.0";
        try {
            "try1";
        } catch (e) {
            "catch1";
        } finally {        
            "finally1.0";
            await p;
            "finally1.1";
        }
        "try0.1"
    } catch (e) {
        "catch0";
    } finally {
        "finally0";
    }
    "after";
}

//// [awaitTryStatement14.js]
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
                    _state.trys.push([2, 8, 9, 10]);
                    "try0.0";
                    _state.label = 3;
                case 3:
                    _state.trys.push([3, 4, 5, 7]);
                    "try1";
                    return [3 /*break*/, 7];
                case 4:
                    _a = _state.error;
                    "catch1";
                    return [3 /*break*/, 7];
                case 5:
                    "finally1.0";
                    return [4 /*yield*/, p];
                case 6:
                    "finally1.1";
                    return [6 /*endfinally*/];
                case 7:
                    "try0.1";
                    return [3 /*break*/, 10];
                case 8:
                    _b = _state.error;
                    "catch0";
                    return [3 /*break*/, 10];
                case 9:
                    "finally0";
                    return [6 /*endfinally*/];
                case 10:
                    "after";
                    return [2 /*return*/];
            }
        })));
    });
    var _a, _b;
}
