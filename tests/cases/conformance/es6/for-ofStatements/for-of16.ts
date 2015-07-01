//@target: ES6
var v: string;
for (v of new StringIterator) { } // Should fail

class StringIterator {
    [Symbol.iterator]() {
        return this;
    }
}