//// [asyncArrowFunction10.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

var foo = async foo(): Promise<void> => {
   // Legal to use 'await' in a type context.
   var v: await;
}


//// [asyncArrowFunction10.js]
var foo = async, foo = function () {
    // Legal to use 'await' in a type context.
    var v;
};
