//@target: ES6
//@noImplicitAny: true
class _StringIterator {
    next() {
        return {
            done: true,
            value: v
        }
    }

    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new _StringIterator) { }