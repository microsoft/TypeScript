//// [awaitBinaryExpression4.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: boolean;
declare var p: Promise<boolean>;
async function func(): Promise<void> {
    "before";
    var b = a || await p;
    "after";
}

//// [awaitBinaryExpression4.js]
function func() {
    var b;
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    "before";
                    _a = a;
                    if (_a)
                        return ["break", 2];
                    return ["yield", p];
                case 1:
                    _a = _state.sent;
                    _state.label = 2;
                case 2:
                    b = _a;
                    "after";
                    return ["return"];
            }
        })));
    });
    var _a;
}
