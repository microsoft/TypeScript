//@target: ES6
var v: string;
for (v of (new StringIterator)[Symbol.iterator]().next()) { } // Should fail

class StringIterator {
    next() {
        return {
            value: 0,
            done: false
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}