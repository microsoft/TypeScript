//@module: amd
//@declaration: true
export = Foo;

interface Foo<T> {
}

function Foo<T>(array: T[]): Foo<T> {
    return undefined;
}

namespace Foo {
    export var x = "hello";
}
