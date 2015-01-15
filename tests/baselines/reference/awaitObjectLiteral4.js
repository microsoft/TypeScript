//// [awaitObjectLiteral4.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: number;
declare var p: Promise<number>;
async function func(): Promise<void> {
    var o = {
        a: 1,
        b: await p,
        c: a
    };
}


//// [awaitObjectLiteral4.js]
function func() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    _a = 1;
                    return ["yield", p];
                case 1:
                    o = {
                        a: _a,
                        b: _state.sent,
                        c: a
                    };
                    return ["return"];
            }
        })));
    });
    var o, _a;
}
