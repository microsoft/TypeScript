//// [generatorTypeCheck23.ts]
class Foo { x: number }
class Bar extends Foo { y: string }
class Baz { z: number }
function* g3() {
    yield;
    yield new Foo;
    yield new Bar;
    yield new Baz;
    yield *[new Bar];
    yield *[new Baz];
}

//// [generatorTypeCheck23.js]
class Foo {
}
class Bar extends Foo {
}
class Baz {
}
function* g3() {
    yield;
    yield new Foo;
    yield new Bar;
    yield new Baz;
    yield* [new Bar];
    yield* [new Baz];
}
