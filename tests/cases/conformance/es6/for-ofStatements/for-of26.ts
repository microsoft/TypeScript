//@target: ES6
class _StringIterator {
    next() {
        return x;
    }
    [Symbol.iterator]() {
        return this;
    }
}

var x: any;
for (var v of new _StringIterator) { }