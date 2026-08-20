//// [tests/cases/compiler/extendGenericArray.ts] ////

//// [extendGenericArray.ts]
interface Array<T> {
    foo(): T;
}

var arr: string[] = [];
var x: number = arr.foo();

//// [extendGenericArray.js]
"use strict";
var arr = [];
var x = arr.foo();
