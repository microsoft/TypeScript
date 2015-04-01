//// [for-of28.ts]
for (var v of new StringIterator) { }

class StringIterator {
    next: any;
    [Symbol.iterator]() {
        return this;
    }
}

//// [for-of28.js]
for (var v of new StringIterator) { }
class StringIterator {
    [Symbol.iterator]() {
        return this;
    }
}
