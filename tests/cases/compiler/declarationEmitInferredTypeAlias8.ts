// @declaration: true

type Foo<T> = T | { x: Foo<T> };
var x: Foo<number[]>;

function returnSomeGlobalValue() {
    return x;
}