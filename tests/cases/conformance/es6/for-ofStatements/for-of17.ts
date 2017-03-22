//@target: ES6
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

var v: string;
for (v of new NumberIterator) { } // Should succeed