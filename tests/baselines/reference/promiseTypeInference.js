//// [promiseTypeInference.ts]
declare class Promise1<T> {
    then<U>(success?: (value: T) => Promise1<U>): Promise1<U>;
}
interface IPromise1<T> {
    then<U>(success?: (value: T) => IPromise1<U>): IPromise1<U>;
}
declare function load(name: string): Promise1<string>;
declare function convert(s: string): IPromise1<number>;

var $$x = load("something").then(s => convert(s));


//// [promiseTypeInference.js]
var $$x = load("something").then(function (s) { return convert(s); });
