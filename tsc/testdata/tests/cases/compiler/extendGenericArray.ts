// @target: es2015
interface Array<T> {
    foo(): T;
}

var arr: string[] = [];
var x: number = arr.foo();