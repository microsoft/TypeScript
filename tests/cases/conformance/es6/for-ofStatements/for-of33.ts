//@target: ES6
//@noImplicitAny: true
class StringIterator {
    [Symbol.iterator]() {
        return v;
    }
}

for (var v of new StringIterator) { }