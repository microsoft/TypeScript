//// [for-of35.ts]
for (var v of new StringIterator) { }

class StringIterator {
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

//// [for-of35.js]
for (var v of new StringIterator) { }
class StringIterator {
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
