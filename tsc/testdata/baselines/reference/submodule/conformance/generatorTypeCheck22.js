//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck22.ts] ////

//// [generatorTypeCheck22.ts]
class Foo { x: number }
class Bar extends Foo { y: string }
class Baz { z: number }
function* g3() {
    yield;
    yield new Bar;
    yield new Baz;
    yield *[new Bar];
    yield *[new Baz];
}

//// [generatorTypeCheck22.js]
class Foo {
    x;
}
class Bar extends Foo {
    y;
}
class Baz {
    z;
}
function* g3() {
    yield;
    yield new Bar;
    yield new Baz;
    yield* [new Bar];
    yield* [new Baz];
}
