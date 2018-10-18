//// [for-of14.ts]
class StringIterator {
    next() {
        return "";
    }
}

var v: string;
for (v of new StringIterator) { } // Should fail because the iterator is not iterable

//// [for-of14.js]
class StringIterator {
    next() {
        return "";
    }
}
var v;
for (v of new StringIterator) { } // Should fail because the iterator is not iterable
