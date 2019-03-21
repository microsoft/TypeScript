//// [for-of30.ts]
class _StringIterator {
    next() {
        return {
            done: false,
            value: ""
        }
    }

    return = 0;

    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new _StringIterator) { }

//// [for-of30.js]
class _StringIterator {
    constructor() {
        this.return = 0;
    }
    next() {
        return {
            done: false,
            value: ""
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}
for (var v of new _StringIterator) { }
