//@target: ES6
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

function fun([[a], b]: Bar[][]) { }
fun(new FooArrayIterator);