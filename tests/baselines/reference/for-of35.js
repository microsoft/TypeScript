//// [for-of35.ts]
class _StringIterator {
    next() {
        return {
            done: true,
            value: v
        }
    }

    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new _StringIterator) { }

//// [for-of35.js]
class _StringIterator {
    next() {
        return {
            done: true,
            value: v
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}
for (var v of new _StringIterator) { }
