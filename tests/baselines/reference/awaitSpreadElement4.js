//// [awaitSpreadElement4.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: number;
declare var ar: number[];
declare var pa: Promise<number>;
declare var par: Promise<number[]>;
async function func(): Promise<void> {
  var x = [a, ...await par, a];
}


//// [awaitSpreadElement4.js]
function func() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    _a = [a];
                    _b = _a.concat;
                    return [4 /*yield*/, par];
                case 1:
                    x = _b.call(_a, _state.sent, [a]);
                    return [2 /*return*/];
            }
        })));
    });
    var x, _a, _b;
}
