//// [asyncMethod6.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

class C {
  async foo(a = await): Promise<void> {
  }
}

//// [asyncMethod6.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (a) {
        return new Promise(function (_resolve) {
            _resolve(__awaiter(__generator(function (_state) {
                switch (_state.label) {
                    case 0:
                        a = await;
                        return ["return"];
                }
            })));
        });
    };
    return C;
})();
