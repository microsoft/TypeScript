//// [promiseTypeInference.ts]
declare class Promise<T> {
    then<U>(success?: (value: T) => Promise<U>): Promise<U>;
}
interface IPromise<T> {
    then<U>(success?: (value: T) => IPromise<U>): IPromise<U>;
}
declare function load(name: string): Promise<string>;
declare function convert(s: string): IPromise<number>;

var $$x = load("something").then(s => convert(s));


//// [promiseTypeInference.js]
var $$x = load("something").then(function (s) { return convert(s); });
