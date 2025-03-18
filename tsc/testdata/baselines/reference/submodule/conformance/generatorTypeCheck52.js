//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck52.ts] ////

//// [generatorTypeCheck52.ts]
class Foo { x: number }
class Baz { z: number }
function* g() {
    yield new Foo;
    yield new Baz;
}

//// [generatorTypeCheck52.js]
class Foo {
    x;
}
class Baz {
    z;
}
function* g() {
    yield new Foo;
    yield new Baz;
}
