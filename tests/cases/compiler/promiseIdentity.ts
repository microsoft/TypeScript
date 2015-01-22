interface IPromise1<T> {
    then<U>(callback: (x: T) => IPromise1<U>): IPromise1<U>;
}
interface Promise1<T> {
    then<U>(callback: (x: T) => Promise1<U>): Promise1<U>;
}
var x: IPromise1<string>;
var x: Promise1<string>;


interface IPromise2<T, V> {
    then<U, W>(callback: (x: T) => IPromise2<U, W>): IPromise2<W, U>;
}
interface Promise2<T, V> {
    then<U, W>(callback: (x: V) => Promise2<U, T>): Promise2<T, W>; // Uses V instead of T in callback's parameter
}

// Ok because T in this particular Promise2 is any, as are all the U and W references.
// Also, the V of Promise2 happens to coincide with the T of IPromise2 (they are both string).
var y: IPromise2<string, number>;
var y: Promise2<any, string>;