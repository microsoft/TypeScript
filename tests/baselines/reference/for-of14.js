//// [tests/cases/conformance/es6/for-ofStatements/for-of14.ts] ////

//// [for-of14.ts]
class MyStringIterator {
    next() {
        return "";
    }
}

var v: string;
for (v of new MyStringIterator) { } // Should fail because the iterator is not iterable

//// [for-of14.js]
class MyStringIterator {
    next() {
        return "";
    }
}
var v;
for (v of new MyStringIterator) { } // Should fail because the iterator is not iterable
