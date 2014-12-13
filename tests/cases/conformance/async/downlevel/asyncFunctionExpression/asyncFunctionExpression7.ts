// @target: ES5
// @noHelpers: true
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

var bar = async function (): Promise<void> {
  // 'await' here is an identifier, and not an await expression.
  var foo = async function (a = await): Promise<void> {
  }
}