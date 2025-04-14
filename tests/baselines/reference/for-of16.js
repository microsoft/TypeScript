//// [tests/cases/conformance/es6/for-ofStatements/for-of16.ts] ////

//// [for-of16.ts]
class MyStringIterator {
    [Symbol.iterator]() {
        return this;
    }
}

var v: string;
for (v of new MyStringIterator) { } // Should fail

for (v of new MyStringIterator) { } // Should still fail (related errors should still be shown even though type is cached).

//// [for-of16.js]
class MyStringIterator {
    [Symbol.iterator]() {
        return this;
    }
}
var v;
for (v of new MyStringIterator) { } // Should fail
for (v of new MyStringIterator) { } // Should still fail (related errors should still be shown even though type is cached).
