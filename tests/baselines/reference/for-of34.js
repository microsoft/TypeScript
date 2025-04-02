//// [tests/cases/conformance/es6/for-ofStatements/for-of34.ts] ////

//// [for-of34.ts]
class MyStringIterator {
    next() {
        return v;
    }

    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new MyStringIterator) { }

//// [for-of34.js]
class MyStringIterator {
    next() {
        return v;
    }
    [Symbol.iterator]() {
        return this;
    }
}
for (var v of new MyStringIterator) { }
