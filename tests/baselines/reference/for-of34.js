//// [for-of34.ts]
class _StringIterator {
    next() {
        return v;
    }

    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new _StringIterator) { }

//// [for-of34.js]
class _StringIterator {
    next() {
        return v;
    }
    [Symbol.iterator]() {
        return this;
    }
}
for (var v of new _StringIterator) { }
