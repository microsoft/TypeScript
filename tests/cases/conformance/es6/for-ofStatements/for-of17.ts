//@target: ES6
var v: string;
for (v of new NumberIterator) { } // Should succeed

class NumberIterator {
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