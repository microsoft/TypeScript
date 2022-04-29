//// [for-of25.ts]
class StringIterator {
    [Symbol.iterator]() {
        return x;
    }
}

var x: any;
for (var v of new StringIterator) { }

//// [for-of25.js]
class StringIterator {
    [Symbol.iterator]() {
        return x;
    }
}
var x;
for (var v of new StringIterator) { }
