//// [asyncMethod5.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

class C {
  async foo(await): Promise<void> {
  }
}

//// [asyncMethod5.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = ;
    return C;
})();
await;
Promise < void  > {};
