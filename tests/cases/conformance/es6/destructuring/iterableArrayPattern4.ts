//@target: ES6
var a: Bar, b: Bar[];
[a, ...b] = new FooIterator;
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