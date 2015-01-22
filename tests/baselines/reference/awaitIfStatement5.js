//// [awaitIfStatement5.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
var a: boolean;
var p: Promise<boolean>;

async function func(): Promise<void> {
    "before";
    if (a) {
        "then";
    } else {
        "else1";
        await p;
        "else2";
    }
    "after";
}

//// [awaitIfStatement5.js]
var a;
var p;
function func() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    "before";
                    if (!(a))
                        return [3 /*break*/, 1];
                    "then";
                    return [3 /*break*/, 3];
                case 1:
                    "else1";
                    return [4 /*yield*/, p];
                case 2:
                    "else2";
                    _state.label = 3;
                case 3:
                    "after";
                    return [2 /*return*/];
            }
        })));
    });
}
