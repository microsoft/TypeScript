//@target: ES6
class Foo { x: number }
class Baz { z: number }
function* g() {
    yield new Foo;
    yield* [new Baz];
}