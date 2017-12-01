//// [for-of22.ts]
class Foo { }
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

v;
for (var v of new FooIterator) {
    
}

//// [for-of22.js]
class Foo {
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
v;
for (var v of new FooIterator) {
}
