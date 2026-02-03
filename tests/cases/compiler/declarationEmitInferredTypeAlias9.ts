// @module: commonjs
// @target: es2015
// @declaration: true

type Foo<T> = T | { x: Foo<T> };
var x: Foo<number[]>;

export function returnSomeGlobalValue() {
    return x;
}