interface IPromise1<T> {
    then<TResult>(successCallback: (promiseValue: T) => TResult, errorCallback?: (reason: any) => TResult): IPromise1<TResult>;
}

var foo: IPromise1<number>;
foo.then((x) => {
    // x is inferred to be a number
    return "asdf";
}).then((x) => {
    // x is inferred to be string
    x.length;
    return 123;
});
