//@target: ES6
var v: string;
for (v of (new StringIterator)[Symbol.iterator]()) { } // Should succeed

class StringIterator implements Iterator<string> {
    next() {
        return "";
    }
    [Symbol.iterator]() {
        return this;
    }
}