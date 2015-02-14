interface IPromise1<T, V> {
    then<U, W>(callback: (x: T) => IPromise1<U, W>): IPromise1<U, W>;
}
interface Promise1<T, V> {
    then<U, W>(callback: (x: T) => Promise1<any, any>): Promise1<any, any>;
}

// Should be ok because signature type parameters get erased to any
var x: IPromise1<string, number>;
var x: Promise1<string, boolean>;