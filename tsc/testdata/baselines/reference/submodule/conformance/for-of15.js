//// [tests/cases/conformance/es6/for-ofStatements/for-of15.ts] ////

//// [for-of15.ts]
class MyStringIterator {
    next() {
        return "";
    }
    [Symbol.iterator]() {
        return this;
    }
}

var v: string;
for (v of new MyStringIterator) { } // Should fail

//// [for-of15.js]
class MyStringIterator {
    next() {
        return "";
    }
    [Symbol.iterator]() {
        return this;
    }
}
var v;
for (v of new MyStringIterator) { } // Should fail
