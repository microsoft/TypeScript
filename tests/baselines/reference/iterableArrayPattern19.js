//// [iterableArrayPattern19.ts]
function fun([[a], b]: Bar[][]) { }
fun(new FooArrayIterator);
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

//// [iterableArrayPattern19.js]
function fun([[a], b]) { }
fun(new FooArrayIterator);
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
