//@target: ES5, ES2015

// In ES3/5, you cannot for...of over an arbitrary iterable.
class MyStringIterator {
    next() {
        return {
            done: true,
            value: ""
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new MyStringIterator) { }