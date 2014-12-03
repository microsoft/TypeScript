//// [awaitContinueStatement3.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: number;
declare var p: Promise<number>;
async function f(): Promise<void> {
  for (var a in {}) {
    await p;
    continue;
  }
}

//// [awaitContinueStatement3.js]
function f() {
    var a, _a, _b;
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    _a = [];
                    for (_b in {}) {
                        _a[_a.length] = _b;
                    }
                    _b = 0;
                    _state.label = 1;
                case 1:
                    if (_b >= _a.length) { return ["break", 4]; }
                    a = _a[_b];
                    return ["yield", p];
                case 2:
                    return ["break", 3];
                case 3:
                    _b++;
                    return ["break", 1];
                case 4:
                    return ["return"];
            }
        })));
    });
}
