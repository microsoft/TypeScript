//// [for-of15.ts]
var v: string;
for (v of new StringIterator) { } // Should fail

class StringIterator {
    next() {
        return "";
    }
    [Symbol.iterator]() {
        return this;
    }
}

//// [for-of15.js]
var v;
for (v of new StringIterator) { } // Should fail
class StringIterator {
    next() {
        return "";
    }
    [Symbol.iterator]() {
        return this;
    }
}
