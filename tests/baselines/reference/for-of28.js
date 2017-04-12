//// [for-of28.ts]
class StringIterator {
    next: any;
    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new StringIterator) { }

//// [for-of28.js]
class StringIterator {
    [Symbol.iterator]() {
        return this;
    }
}
for (var v of new StringIterator) { }
