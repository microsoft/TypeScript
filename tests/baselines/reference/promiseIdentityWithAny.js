//// [promiseIdentityWithAny.ts]
interface IPromise<T, V> {
    then<U, W>(callback: (x: T) => IPromise<U, W>): IPromise<U, W>;
}
interface Promise<T, V> {
    then<U, W>(callback: (x: T) => Promise<any, any>): Promise<any, any>;
}

// Should be ok because signature type parameters get erased to any
var x: IPromise<string, number>;
var x: Promise<string, boolean>;

//// [promiseIdentityWithAny.js]
// Should be ok because signature type parameters get erased to any
var x;
var x;
