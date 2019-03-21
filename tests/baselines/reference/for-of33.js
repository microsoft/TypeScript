//// [for-of33.ts]
class _StringIterator {
    [Symbol.iterator]() {
        return v;
    }
}

for (var v of new _StringIterator) { }

//// [for-of33.js]
class _StringIterator {
    [Symbol.iterator]() {
        return v;
    }
}
for (var v of new _StringIterator) { }
