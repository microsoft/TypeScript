//// [iterableArrayPattern20.ts]
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

//// [iterableArrayPattern20.js]
function fun(...[[a = new Foo], b = [new Foo]]) { }
fun(...new FooArrayIterator);
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
