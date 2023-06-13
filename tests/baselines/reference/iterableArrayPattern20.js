//// [tests/cases/conformance/es6/destructuring/iterableArrayPattern20.ts] ////

//// [iterableArrayPattern20.ts]
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

function fun(...[[a = new Foo], b = [new Foo]]: Bar[][]) { }
fun(...new FooArrayIterator);

//// [iterableArrayPattern20.js]
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
function fun(...[[a = new Foo], b = [new Foo]]) { }
fun(...new FooArrayIterator);
