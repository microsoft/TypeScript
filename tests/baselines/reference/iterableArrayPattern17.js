//// [tests/cases/conformance/es6/destructuring/iterableArrayPattern17.ts] ////

//// [iterableArrayPattern17.ts]
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

function fun(...[a, b]: Bar[]) { }
fun(new FooIterator);

//// [iterableArrayPattern17.js]
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
function fun(...[a, b]) { }
fun(new FooIterator);
