//// [tests/cases/conformance/es6/destructuring/iterableArrayPattern7.ts] ////

//// [iterableArrayPattern7.ts]
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

var a: Bar, b: string[];
[a, b] = new FooIterator;

//// [iterableArrayPattern7.js]
class Bar {
}
class Foo extends Bar {
}
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
var a, b;
[a, b] = new FooIterator;
