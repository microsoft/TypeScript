//// [for-of28.ts]
class _StringIterator {
    next: any;
    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new _StringIterator) { }

//// [for-of28.js]
class _StringIterator {
    [Symbol.iterator]() {
        return this;
    }
}
for (var v of new _StringIterator) { }
