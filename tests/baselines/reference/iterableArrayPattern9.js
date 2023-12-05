//// [tests/cases/conformance/es6/destructuring/iterableArrayPattern9.ts] ////

//// [iterableArrayPattern9.ts]
function fun([a, b] = new FooIterator) { }
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

//// [iterableArrayPattern9.js]
function fun([a, b] = new FooIterator) { }
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
