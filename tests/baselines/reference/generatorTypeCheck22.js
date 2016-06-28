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
}
class Bar extends Foo {
}
class Baz {
}
function* g3() {
    yield;
    yield new Bar;
    yield new Baz;
    yield* [new Bar];
    yield* [new Baz];
}
