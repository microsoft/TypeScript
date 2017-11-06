//@target: ES6
class Foo { x: number }
class Bar extends Foo { y: string }
function* g(): Iterator<Foo> {
    yield;
    yield * [new Bar];
}