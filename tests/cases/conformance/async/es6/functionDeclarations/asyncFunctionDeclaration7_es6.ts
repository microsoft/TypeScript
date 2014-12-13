// @target: ES6
// @noHelpers: true
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

async function bar(): Promise<void> {
  // 'await' here is an identifier, and not a yield expression.
  async function foo(a = await): Promise<void> {
  }
}