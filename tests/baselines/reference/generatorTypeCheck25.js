//// [generatorTypeCheck25.ts]
class Foo { x: number }
class Bar extends Foo { y: string }
class Baz { z: number }
var g3: () => Iterable<Foo> = function* () {
    yield;
    yield new Bar;
    yield new Baz;
    yield *[new Bar];
    yield *[new Baz];
}

//// [generatorTypeCheck25.js]
class Foo {
}
class Bar extends Foo {
}
class Baz {
}
var g3 = function* () {
    yield;
    yield new Bar;
    yield new Baz;
    yield* [new Bar];
    yield* [new Baz];
};
