//// [extendGenericArray.ts]
interface Array<T> {
    foo(): T;
}

var arr: string[] = [];
var x: number = arr.foo();

//// [extendGenericArray.js]
var arr = [];
var x = arr.foo();
