//// [for-of26.ts]
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

//// [for-of26.js]
class _StringIterator {
    next() {
        return x;
    }
    [Symbol.iterator]() {
        return this;
    }
}
var x;
for (var v of new _StringIterator) { }
