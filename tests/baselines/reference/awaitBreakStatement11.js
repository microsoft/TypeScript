//// [awaitBreakStatement11.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: number;
declare var p: Promise<number>;
async function f(): Promise<void> {
  label: switch (a) {
    case 0:
      await p;
      break label;
  }
}

//// [awaitBreakStatement11.js]
function f() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    _a = a;
                    switch (_a) {
                        case 0:
                            return [3 /*break*/, 1];
                    }
                    return [3 /*break*/, 3];
                case 1:
                    return [4 /*yield*/, p];
                case 2:
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        })));
    });
    var _a;
}
