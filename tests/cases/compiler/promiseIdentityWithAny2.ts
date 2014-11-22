interface IPromise1<T, V> {
    then<U, W>(callback: (x: T) => IPromise1<U, W>): IPromise1<U, W>;
}
interface Promise1<T, V> {
    then(callback: (x: T) => Promise1<any, any>): Promise1<any, any>;
}

// Error because type parameter arity doesn't match
var x: IPromise1<string, number>;
var x: Promise1<string, boolean>;


interface IPromise2<T, V> {
    then<U, W>(callback: (x: T) => IPromise2<U, W>): IPromise2<U, W>;
}
interface Promise2<T, V> {
    then<U, W>(callback: (x: T) => Promise2<string, any>): Promise2<any, any>; // Uses string instead of any!
}

// Error because string and any don't match
var y: IPromise2<string, number>;
var y: Promise2<string, boolean>;