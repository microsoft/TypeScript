//@target: ES6
class _StringIterator {
    next: any;
    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new _StringIterator) { }