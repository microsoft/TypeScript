//@target: ES6
//@noImplicitAny: true
class StringIterator {
    next() {
        return v;
    }

    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new StringIterator) { }