//// [generatorTypeCheck17.ts]
class Foo { x: number }
class Bar extends Foo { y: string }
function* g(): Iterator<Foo> {
    yield;
    yield new Bar;
}

//// [generatorTypeCheck17.js]
class Foo {
}
class Bar extends Foo {
}
function* g() {
    yield;
    yield new Bar;
}
