//// [awaitWhileStatement2.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: boolean;
declare var p: Promise<boolean>;
async function func(): Promise<void> {
    "before";
    while (a) {
        "body1";
        await p;
        "body2";
    }
    "after";
}

//// [awaitWhileStatement2.js]
function func() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    "before";
                    _state.label = 1;
                case 1:
                    if (!(a))
                        return [3 /*break*/, 3];
                    "body1";
                    return [4 /*yield*/, p];
                case 2:
                    "body2";
                    return [3 /*break*/, 1];
                case 3:
                    "after";
                    return [2 /*return*/];
            }
        })));
    });
}
