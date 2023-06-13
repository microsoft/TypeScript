//// [tests/cases/compiler/promiseTypeInference.ts] ////

//// [promiseTypeInference.ts]
declare class CPromise<T> {
    then<U>(success?: (value: T) => CPromise<U>): CPromise<U>;
}
interface IPromise<T> {
    then<U>(success?: (value: T) => IPromise<U>): IPromise<U>;
}
declare function load(name: string): CPromise<string>;
declare function convert(s: string): IPromise<number>;

var $$x = load("something").then(s => convert(s));


//// [promiseTypeInference.js]
var $$x = load("something").then(function (s) { return convert(s); });
