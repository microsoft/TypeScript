//// [for-of14.ts]
class _StringIterator {
    next() {
        return "";
    }
}

var v: string;
for (v of new _StringIterator) { } // Should fail because the iterator is not iterable

//// [for-of14.js]
class _StringIterator {
    next() {
        return "";
    }
}
var v;
for (v of new _StringIterator) { } // Should fail because the iterator is not iterable
