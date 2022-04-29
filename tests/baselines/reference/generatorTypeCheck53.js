//// [generatorTypeCheck53.ts]
class Foo { x: number }
class Baz { z: number }
function* g() {
    yield new Foo;
    yield* [new Baz];
}

//// [generatorTypeCheck53.js]
class Foo {
}
class Baz {
}
function* g() {
    yield new Foo;
    yield* [new Baz];
}
