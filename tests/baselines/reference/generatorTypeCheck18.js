//// [generatorTypeCheck18.ts]
class Foo { x: number }
class Baz { z: number }
function* g(): Iterator<Foo> {
    yield;
    yield new Baz;
}

//// [generatorTypeCheck18.js]
class Foo {
}
class Baz {
}
function* g() {
    yield;
    yield new Baz;
}
