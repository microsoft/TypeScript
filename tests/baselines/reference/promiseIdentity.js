//// [tests/cases/compiler/promiseIdentity.ts] ////

//// [promiseIdentity.ts]
export interface IPromise<T> {
    then<U>(callback: (x: T) => IPromise<U>): IPromise<U>;
}
interface Promise<T> {
    then<U>(callback: (x: T) => Promise<U>): Promise<U>;
}
var x: IPromise<string>;
var x: Promise<string>;


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

//// [promiseIdentity.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var x;
var x;
// Ok because T in this particular Promise2 is any, as are all the U and W references.
// Also, the V of Promise2 happens to coincide with the T of IPromise2 (they are both string).
var y;
var y;
