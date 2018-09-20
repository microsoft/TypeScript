//@target: ES6
class StringIterator {
    next() {
        return "";
    }
}

var v: string;
for (v of new StringIterator) { } // Should fail because the iterator is not iterable