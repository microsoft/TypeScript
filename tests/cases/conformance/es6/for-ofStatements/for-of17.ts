//@target: ES6
var v: number;
for (v of (new NumberIterator)[Symbol.iterator]().next()) { } // Should fail

class NumberIterator {
    next() {
        return 0;
    }
    [Symbol.iterator]() {
        return this;
    }
}