//@target: ES6
class Foo { x: number }
class Baz { z: number }
function* g(): Iterator<Foo> {
    yield;
    yield * [new Baz];
}