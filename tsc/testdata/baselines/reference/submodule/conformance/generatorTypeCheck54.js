//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck54.ts] ////

//// [generatorTypeCheck54.ts]
class Foo { x: number }
class Baz { z: number }
function* g() {
    yield* [new Foo];
    yield* [new Baz];
}

//// [generatorTypeCheck54.js]
class Foo {
    x;
}
class Baz {
    z;
}
function* g() {
    yield* [new Foo];
    yield* [new Baz];
}
