//@module: amd
//@declaration: true
export = Foo;

interface Foo<T> {
}

function Foo<T>(array: T[]): Foo<T> {
    return undefined;
}

module Foo {
    export var x = "hello";
}
