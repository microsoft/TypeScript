//// [tests/cases/compiler/extendGenericArray2.ts] ////

//// [extendGenericArray2.ts]
interface IFoo<T> {
    x: T;
}

interface Array<T> extends IFoo<T> { }

var arr: string[] = [];
var y: number = arr.x;

//// [extendGenericArray2.js]
var arr = [];
var y = arr.x;
