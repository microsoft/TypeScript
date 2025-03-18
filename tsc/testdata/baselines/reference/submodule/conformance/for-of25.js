//// [tests/cases/conformance/es6/for-ofStatements/for-of25.ts] ////

//// [for-of25.ts]
class MyStringIterator {
    [Symbol.iterator]() {
        return x;
    }
}

var x: any;
for (var v of new MyStringIterator) { }

//// [for-of25.js]
class MyStringIterator {
    [Symbol.iterator]() {
        return x;
    }
}
var x;
for (var v of new MyStringIterator) { }
