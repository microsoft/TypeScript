//// [asyncGetter1.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

class C {
  async get foo(): Promise<void> {
  }
}

//// [asyncGetter1.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "foo", {
        get: function () {
            return new Promise(function (_resolve) {
                _resolve(__awaiter(__generator(function (_state) {
                    switch (_state.label) {
                        case 0: return ["return"];
                    }
                })));
            });
        },
        enumerable: true,
        configurable: true
    });
    return C;
})();
