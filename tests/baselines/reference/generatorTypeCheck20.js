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
}
class Baz {
}
function* g() {
    yield;
    yield* [new Baz];
}
