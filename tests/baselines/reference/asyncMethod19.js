//// [asyncMethod19.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

var o = {
  async foo(await): Promise<void> {
  }
}

//// [asyncMethod19.js]
var o = {
    foo: function () {
        return new Promise(function (_resolve) {
            _resolve(__awaiter(__generator(function (_state) {
                return [2 /*return*/];
            })));
        });
    },
    await: ,
    Promise: function () {
    },
    void:  > {}
};
