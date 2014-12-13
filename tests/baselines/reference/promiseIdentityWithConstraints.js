//// [promiseIdentityWithConstraints.ts]
interface IPromise1<T, V> {
    then<U extends T, W extends V>(callback: (x: T) => IPromise1<U, W>): IPromise1<U, W>;
}
interface Promise1<T, V> {
    then<U extends T, W extends V>(callback: (x: T) => Promise1<U, W>): Promise1<U, W>;
}

// Error because constraint V doesn't match
var x: IPromise1<string, number>;
var x: Promise1<string, boolean>;

//// [promiseIdentityWithConstraints.js]
// Error because constraint V doesn't match
var x;
var x;
