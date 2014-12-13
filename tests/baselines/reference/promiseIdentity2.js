//// [promiseIdentity2.ts]
interface IPromise_<T, V> {
    then<U, W>(callback: (x: T) => IPromise_<U, W>): IPromise_<U, W>;
}
interface Promise_<T, V> {
    then<U, W>(callback: (x: T) => Promise_<T, U>): Promise_<T, W>;
}

// error because T is string in the first declaration, and T is boolean in the second
// Return type and callback return type are ok because T is any in this particular Promise
var x: IPromise_<string, number>;
var x: Promise_<any, string>;

//// [promiseIdentity2.js]
// error because T is string in the first declaration, and T is boolean in the second
// Return type and callback return type are ok because T is any in this particular Promise
var x;
var x;
