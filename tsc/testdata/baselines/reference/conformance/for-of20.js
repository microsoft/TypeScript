//// [tests/cases/conformance/es6/for-ofStatements/for-of20.ts] ////

//// [for-of20.ts]
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

for (let v of new FooIterator) {
    v;
}

//// [for-of20.js]
"use strict";
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
for (let v of new FooIterator) {
    v;
}
