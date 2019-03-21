//@target: ES6
class _StringIterator {
    [Symbol.iterator]() {
        return this;
    }
}

var v: string;
for (v of new _StringIterator) { } // Should fail