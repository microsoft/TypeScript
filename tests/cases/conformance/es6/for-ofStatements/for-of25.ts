//@target: ES6
class _StringIterator {
    [Symbol.iterator]() {
        return x;
    }
}

var x: any;
for (var v of new _StringIterator) { }