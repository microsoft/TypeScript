//// [awaitArrayLiteral4.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: number;
declare var p: Promise<number>;
async function func(): Promise<void> {
    var b = [1, await p, 2];
}


//// [awaitArrayLiteral4.js]
function func() {
    var b, _a;
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    _a = 1;
                    return ["yield", p];
                case 1:
                    b = [_a, _state.sent, 2];
                    return ["return"];
            }
        })));
    });
}
