//@target: ES6
class StringIterator {
    [Symbol.iterator]() {
        return this;
    }
}

var v: string;
for (v of new StringIterator) { } // Should fail