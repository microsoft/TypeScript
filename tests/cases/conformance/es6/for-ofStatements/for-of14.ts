//@target: ES6
class _StringIterator {
    next() {
        return "";
    }
}

var v: string;
for (v of new _StringIterator) { } // Should fail because the iterator is not iterable