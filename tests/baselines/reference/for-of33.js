//// [for-of33.ts]
for (var v of new StringIterator) { }

class StringIterator {
    [Symbol.iterator]() {
        return v;
    }
}

//// [for-of33.js]
for (var v of new StringIterator) { }
class StringIterator {
    [Symbol.iterator]() {
        return v;
    }
}
