//// [for-of15.ts]
class _StringIterator {
    next() {
        return "";
    }
    [Symbol.iterator]() {
        return this;
    }
}

var v: string;
for (v of new _StringIterator) { } // Should fail

//// [for-of15.js]
class _StringIterator {
    next() {
        return "";
    }
    [Symbol.iterator]() {
        return this;
    }
}
var v;
for (v of new _StringIterator) { } // Should fail
