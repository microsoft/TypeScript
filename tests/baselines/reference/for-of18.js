//// [for-of18.ts]
class _StringIterator {
    next() {
        return {
            value: "",
            done: false
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}

var v: string;
for (v of new _StringIterator) { } // Should succeed

//// [for-of18.js]
class _StringIterator {
    next() {
        return {
            value: "",
            done: false
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}
var v;
for (v of new _StringIterator) { } // Should succeed
