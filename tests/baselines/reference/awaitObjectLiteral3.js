//// [awaitObjectLiteral3.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: number;
declare var p: Promise<number>;
async function func(): Promise<void> {
    var o = {
        a: a,
        b: await p,
        c: 1
    };
}

//// [awaitObjectLiteral3.js]
function func() {
    var o;
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    _a = a;
                    return ["yield", p];
                case 1:
                    o = {
                        a: _a,
                        b: _state.sent,
                        c: 1
                    };
                    return ["return"];
            }
        })));
    });
    var _a;
}
