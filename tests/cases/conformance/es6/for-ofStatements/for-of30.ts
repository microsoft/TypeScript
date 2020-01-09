//@target: ES6
class StringIterator {
    next() {
        return {
            done: false,
            value: ""
        }
    }

    return = 0;

    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new StringIterator) { }