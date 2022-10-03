//// [promiseIdentityWithAny2.ts]
export interface IPromise<T, V> {
    then<U, W>(callback: (x: T) => IPromise<U, W>): IPromise<U, W>;
}
interface Promise<T, V> {
    then(callback: (x: T) => Promise<any, any>): Promise<any, any>;
}

// Error because type parameter arity doesn't match
var x: IPromise<string, number>;
var x: Promise<string, boolean>;


interface IPromise2<T, V> {
    then<U, W>(callback: (x: T) => IPromise2<U, W>): IPromise2<U, W>;
}
interface Promise2<T, V> {
    then<U, W>(callback: (x: T) => Promise2<string, any>): Promise2<any, any>; // Uses string instead of any!
}

// Error because string and any don't match
var y: IPromise2<string, number>;
var y: Promise2<string, boolean>;

//// [promiseIdentityWithAny2.js]
"use strict";
exports.__esModule = true;
// Error because type parameter arity doesn't match
var x;
var x;
// Error because string and any don't match
var y;
var y;
