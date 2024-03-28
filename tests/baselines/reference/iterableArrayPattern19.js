//// [tests/cases/conformance/es6/destructuring/iterableArrayPattern19.ts] ////

//// [iterableArrayPattern19.ts]
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

//// [iterableArrayPattern19.js]
class Bar {
}
class Foo extends Bar {
}
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
function fun([[a], b]) { }
fun(new FooArrayIterator);
