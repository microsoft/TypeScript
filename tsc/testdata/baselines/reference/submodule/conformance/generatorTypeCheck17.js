//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck17.ts] ////

//// [generatorTypeCheck17.ts]
class Foo { x: number }
class Bar extends Foo { y: string }
function* g(): IterableIterator<Foo> {
    yield;
    yield new Bar;
}

//// [generatorTypeCheck17.js]
class Foo {
    x;
}
class Bar extends Foo {
    y;
}
function* g() {
    yield;
    yield new Bar;
}
