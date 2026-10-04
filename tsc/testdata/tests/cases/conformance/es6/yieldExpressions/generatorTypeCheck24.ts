//@target: ES6
class Foo { x: number }
class Bar extends Foo { y: string }
class Baz { z: number }
function* g3() {
    yield;
    yield * [new Foo];
    yield new Bar;
    yield new Baz;
    yield *[new Bar];
    yield *[new Baz];
}