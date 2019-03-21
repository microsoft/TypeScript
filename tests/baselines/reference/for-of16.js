//// [for-of16.ts]
class _StringIterator {
    [Symbol.iterator]() {
        return this;
    }
}

var v: string;
for (v of new _StringIterator) { } // Should fail

//// [for-of16.js]
class _StringIterator {
    [Symbol.iterator]() {
        return this;
    }
}
var v;
for (v of new _StringIterator) { } // Should fail
