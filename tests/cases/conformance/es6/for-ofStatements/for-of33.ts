//@target: ES6
//@noImplicitAny: true
for (var v of new StringIterator) { }

class StringIterator {
    [Symbol.iterator]() {
        return v;
    }
}