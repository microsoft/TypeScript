//// [promiseIdentity2.ts]
interface IPromise1<T, V> {
    then<U, W>(callback: (x: T) => IPromise1<U, W>): IPromise1<U, W>;
}
interface Promise1<T, V> {
    then<U, W>(callback: (x: T) => Promise1<T, U>): Promise1<T, W>;
}

// error because T is string in the first declaration, and T is boolean in the second
// Return type and callback return type are ok because T is any in this particular Promise
var x: IPromise1<string, number>;
var x: Promise1<any, string>;

//// [promiseIdentity2.js]
// error because T is string in the first declaration, and T is boolean in the second
// Return type and callback return type are ok because T is any in this particular Promise
var x;
var x;
