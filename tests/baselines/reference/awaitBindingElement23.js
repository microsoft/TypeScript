//// [awaitBindingElement23.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: number;
declare var ar: number[];
declare var pa: Promise<number>;
declare var par: Promise<number[]>;
async function func(): Promise<void> {
  var [ x ] = await par;
}


//// [awaitBindingElement23.js]
function func() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    return [4 /*yield*/, par];
                case 1:
                    x = _state.sent[0];
                    return [2 /*return*/];
            }
        })));
    });
    var x;
}
