//// [tests/cases/conformance/es6/for-ofStatements/for-of28.ts] ////

//// [for-of28.ts]
class MyStringIterator {
    next: any;
    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new MyStringIterator) { }

//// [for-of28.js]
class MyStringIterator {
    [Symbol.iterator]() {
        return this;
    }
}
for (var v of new MyStringIterator) { }
