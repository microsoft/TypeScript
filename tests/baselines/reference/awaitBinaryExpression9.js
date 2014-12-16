//// [awaitBinaryExpression9.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: number;
declare var p: Promise<number>;
async function func(): Promise<void> {
    "before";
    var b = a + await p;
    "after";
}

//// [awaitBinaryExpression9.js]
function func() {
    var b;
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    "before";
                    _a = a;
                    return ["yield", p];
                case 1:
                    b = _a + _state.sent;
                    "after";
                    return ["return"];
            }
        })));
    });
    var _a;
}
