//// [for-of25.ts]
class _StringIterator {
    [Symbol.iterator]() {
        return x;
    }
}

var x: any;
for (var v of new _StringIterator) { }

//// [for-of25.js]
class _StringIterator {
    [Symbol.iterator]() {
        return x;
    }
}
var x;
for (var v of new _StringIterator) { }
