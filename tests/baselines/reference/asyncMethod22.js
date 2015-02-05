//// [asyncMethod22.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

var o = {
  async foo(): Promise<void> {
    var v = { [await]: foo }
  }
};

//// [asyncMethod22.js]
var o = {
    foo: function () {
        return new Promise(function (_resolve) {
            _resolve(__awaiter(__generator(function (_state) {
                switch (_state.label) {
                    case 0:
                        return [4 /*yield*/, ];
                    case 1:
                        v = { [_state.sent]: foo };
                        return [2 /*return*/];
                }
            })));
        });
        var v;
    }
};
