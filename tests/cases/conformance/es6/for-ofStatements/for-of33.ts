//@target: ES6
//@noImplicitAny: true
class _StringIterator {
    [Symbol.iterator]() {
        return v;
    }
}

for (var v of new _StringIterator) { }