//// [tests/cases/conformance/es6/for-ofStatements/for-of18.ts] ////

//// [for-of18.ts]
class MyStringIterator {
    next() {
        return {
            value: "",
            done: false
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}

var v: string;
for (v of new MyStringIterator) { } // Should succeed

//// [for-of18.js]
class MyStringIterator {
    next() {
        return {
            value: "",
            done: false
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}
var v;
for (v of new MyStringIterator) { } // Should succeed
