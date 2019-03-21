//// [for-of31.ts]
class _StringIterator {
    next() {
        return {
            // no done property
            value: ""
        }
    }

    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new _StringIterator) { }

//// [for-of31.js]
class _StringIterator {
    next() {
        return {
            // no done property
            value: ""
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}
for (var v of new _StringIterator) { }
