//// [awaitContinueStatement8.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: number;
declare var p: Promise<number>;
async function f(): Promise<void> {
  label: while (true) {
    await p;
    while (false) {
      continue;
    }
  }
}

//// [awaitContinueStatement8.js]
function f() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    if (!(true))
                        return [3 /*break*/, 2];
                    return [4 /*yield*/, p];
                case 1:
                    while (false) {
                        continue;
                    }
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        })));
    });
}
