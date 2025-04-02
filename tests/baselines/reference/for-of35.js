//// [tests/cases/conformance/es6/for-ofStatements/for-of35.ts] ////

//// [for-of35.ts]
class MyStringIterator {
    next() {
        return {
            done: true,
            value: v
        }
    }

    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new MyStringIterator) { }

//// [for-of35.js]
class MyStringIterator {
    next() {
        return {
            done: true,
            value: v
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}
for (var v of new MyStringIterator) { }
