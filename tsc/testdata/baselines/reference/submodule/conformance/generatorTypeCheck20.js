//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck20.ts] ////

//// [generatorTypeCheck20.ts]
class Foo { x: number }
class Baz { z: number }
function* g(): IterableIterator<Foo> {
    yield;
    yield * [new Baz];
}

//// [generatorTypeCheck20.js]
class Foo {
    x;
}
class Baz {
    z;
}
function* g() {
    yield;
    yield* [new Baz];
}
