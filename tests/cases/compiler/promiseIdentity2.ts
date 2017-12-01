export interface IPromise<T, V> {
    then<U, W>(callback: (x: T) => IPromise<U, W>): IPromise<U, W>;
}
export interface Promise<T, V> {
    then<U, W>(callback: (x: T) => Promise<T, U>): Promise<T, W>;
}

// error because T is string in the first declaration, and T is boolean in the second
// Return type and callback return type are ok because T is any in this particular Promise
var x: IPromise<string, number>;
var x: Promise<any, string>;