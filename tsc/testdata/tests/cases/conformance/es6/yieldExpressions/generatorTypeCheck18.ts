//@target: ES6
class Foo { x: number }
class Baz { z: number }
function* g(): IterableIterator<Foo> {
    yield;
    yield new Baz;
}