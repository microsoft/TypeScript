//// [tests/cases/conformance/es6/for-ofStatements/for-of26.ts] ////

//// [for-of26.ts]
class StringIterator {
    next() {
        return x;
    }
    [Symbol.iterator]() {
        return this;
    }
}

var x: any;
for (var v of new StringIterator) { }

//// [for-of26.js]
class StringIterator {
    next() {
        return x;
    }
    [Symbol.iterator]() {
        return this;
    }
}
var x;
for (var v of new StringIterator) { }
