//// [iterableArrayPattern12.ts]
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

function fun([a, ...b] = new FooIterator) { }
fun(new FooIterator);

//// [iterableArrayPattern12.js]
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
function fun([a, ...b] = new FooIterator) { }
fun(new FooIterator);
