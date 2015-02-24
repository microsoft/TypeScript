//@target: ES6
var v: string;
for (v of new StringIterator) { } // Should fail because the iterator is not iterable

class StringIterator {
    next() {
        return "";
    }
}