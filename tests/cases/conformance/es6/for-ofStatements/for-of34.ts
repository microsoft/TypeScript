//@target: ES6
//@noImplicitAny: true
class MyStringIterator {
    next() {
        return v;
    }

    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new MyStringIterator) { }