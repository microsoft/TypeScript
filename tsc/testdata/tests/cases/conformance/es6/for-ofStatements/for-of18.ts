//@target: ES6
class MyStringIterator {
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
for (v of new MyStringIterator) { } // Should succeed