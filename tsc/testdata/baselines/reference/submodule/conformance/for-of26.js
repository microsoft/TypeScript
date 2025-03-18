//// [tests/cases/conformance/es6/for-ofStatements/for-of26.ts] ////

//// [for-of26.ts]
class MyStringIterator {
    next() {
        return x;
    }
    [Symbol.iterator]() {
        return this;
    }
}

var x: any;
for (var v of new MyStringIterator) { }

//// [for-of26.js]
class MyStringIterator {
    next() {
        return x;
    }
    [Symbol.iterator]() {
        return this;
    }
}
var x;
for (var v of new MyStringIterator) { }
