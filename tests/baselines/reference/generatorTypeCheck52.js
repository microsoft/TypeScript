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
}
class Baz {
}
function* g() {
    yield new Foo;
    yield new Baz;
}
