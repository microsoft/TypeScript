//@target: ES6
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