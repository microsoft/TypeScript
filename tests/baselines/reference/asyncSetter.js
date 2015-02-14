//// [asyncSetter.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

class C {
  async set foo(value) {
  }
}

//// [asyncSetter.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "foo", {
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    return C;
})();
