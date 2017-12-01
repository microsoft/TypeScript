//@target: ES6
class StringIterator {
    next() {
        return "";
    }
    [Symbol.iterator]() {
        return this;
    }
}

var v: string;
for (v of new StringIterator) { } // Should fail