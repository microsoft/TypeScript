// @target: ES5
// @noHelpers: true
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

async function func(): Promise<void> {
  // variable statement
  var a = 1;
  var /*variable decl*/ b = 1;
  var c = /*variable decl*/ 1;
}

 function func1(): void {
  // variable statement
  var a = 1;
  var /*variable decl*/ b = 1;
  var c = /*variable decl*/ 1;
}
