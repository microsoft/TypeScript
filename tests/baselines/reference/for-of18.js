//// [for-of18.ts]
var v: string;
for (v of new StringIterator) { } // Should succeed

class StringIterator {
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

//// [for-of18.js]
var v;
for (v of new StringIterator) { } // Should succeed
class StringIterator {
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
