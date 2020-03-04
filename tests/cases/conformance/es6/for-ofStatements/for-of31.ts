//@target: ES6
class StringIterator {
    next() {
        return {
            // no done property
            value: ""
        }
    }

    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new StringIterator) { }