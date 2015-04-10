//@target: ES6
function fun(...[[a = new Foo], b = [new Foo]]: Bar[][]) { }
fun(...new FooArrayIterator);
class Bar { x }
class Foo extends Bar { y }
class FooArrayIterator {
    next() {
        return {
            value: [new Foo],
            done: false
        };
    }

    [Symbol.iterator]() {
        return this;
    }
}