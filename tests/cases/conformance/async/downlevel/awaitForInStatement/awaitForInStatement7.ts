// @target: ES5
// @noHelpers: true
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: any;
declare var o: { i: any };
declare var p: Promise<any>;
async function func(): Promise<void> {
    "before";
    for (o.i in a) {
        "body";
    }
    "after";
}