//// [for-of25.ts]
var x: any;
for (var v of new StringIterator) { }

class StringIterator {
    [Symbol.iterator]() {
        return x;
    }
}

//// [for-of25.js]
var x;
for (var v of new StringIterator) { }
class StringIterator {
    [Symbol.iterator]() {
        return x;
    }
}
