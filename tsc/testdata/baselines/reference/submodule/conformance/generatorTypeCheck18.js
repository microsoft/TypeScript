//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck18.ts] ////

//// [generatorTypeCheck18.ts]
class Foo { x: number }
class Baz { z: number }
function* g(): IterableIterator<Foo> {
    yield;
    yield new Baz;
}

//// [generatorTypeCheck18.js]
class Foo {
    x;
}
class Baz {
    z;
}
function* g() {
    yield;
    yield new Baz;
}
