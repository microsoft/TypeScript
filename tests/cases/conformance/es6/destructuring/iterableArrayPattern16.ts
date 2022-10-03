//@target: ES6
function fun(...[a, b]: [Bar, Bar][]) { }
fun(...new FooIteratorIterator);
class Bar { x }
class Foo extends Bar { y }
class FooIterator {
    next() {
        return {
            value: new Foo,
            done: false
        };
    }

    [Symbol.iterator]() {
        return this;
    }
}

class FooIteratorIterator {
    next() {
        return {
            value: new FooIterator,
            done: false
        };
    }

    [Symbol.iterator]() {
        return this;
    }
}