//// [tests/cases/conformance/es6/for-ofStatements/for-of19.ts] ////

//// [for-of19.ts]
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

for (var v of new FooIterator) {
    v;
}

//// [for-of19.js]
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
for (var v of new FooIterator) {
    v;
}
