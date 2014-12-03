//// [awaitForStatement5.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var p: Promise<number>;
async function func(): Promise<void> {
    "before";
    for (var i = 0; i < 1; i += await p) {
        "body";
    }
    "after";
}

//// [awaitForStatement5.js]
function func() {
    var i;
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    "before";
                    i = 0;
                    _state.label = 1;
                case 1:
                    if (!(i < 1)) { return ["break", 4]; }
                    "body";
                    _state.label = 2;
                case 2:
                    return ["yield", p];
                case 3:
                    i += _state.sent;
                    return ["break", 1];
                case 4:
                    "after";
                    return ["return"];
            }
        })));
    });
}
