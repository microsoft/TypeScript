//// [asyncGetter3.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

class C {
  async get bar(): Promise<void> {
    // 'await' here is an identifier, and not an await expression.
    async function foo(a = await): Promise<void> {
    }
  }
}

//// [asyncGetter3.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "bar", {
        get: function () {
            // 'await' here is an identifier, and not an await expression.
            function foo(a) {
                if (a === void 0) { a = await; }
                return new Promise(function (_resolve) {
                    _resolve(__awaiter(__generator(function (_state) {
                        return [2 /*return*/];
                    })));
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    return C;
})();
