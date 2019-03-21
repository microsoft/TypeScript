//@target: ES6
class _StringIterator {
    next() {
        return {
            value: "",
            done: false
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}

var v: string;
for (v of new _StringIterator) { } // Should succeed