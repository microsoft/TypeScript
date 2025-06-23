//// [tests/cases/conformance/es6/for-ofStatements/for-of33.ts] ////

//// [for-of33.ts]
class MyStringIterator {
    [Symbol.iterator]() {
        return v;
    }
}

for (var v of new MyStringIterator) { }

//// [for-of33.js]
class MyStringIterator {
    [Symbol.iterator]() {
        return v;
    }
}
for (var v of new MyStringIterator) { }
