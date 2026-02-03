//// [tests/cases/compiler/propagationOfPromiseInitialization.ts] ////

//// [propagationOfPromiseInitialization.ts]
interface IPromise<T> {
    then<TResult>(successCallback: (promiseValue: T) => TResult, errorCallback?: (reason: any) => TResult): IPromise<TResult>;
}

var foo: IPromise<number>;
foo.then((x) => {
    // x is inferred to be a number
    return "asdf";
}).then((x) => {
    // x is inferred to be string
    x.length;
    return 123;
});


//// [propagationOfPromiseInitialization.js]
var foo;
foo.then(function (x) {
    // x is inferred to be a number
    return "asdf";
}).then(function (x) {
    // x is inferred to be string
    x.length;
    return 123;
});
