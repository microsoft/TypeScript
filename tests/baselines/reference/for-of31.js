//// [for-of31.ts]
for (var v of new StringIterator) { }

class StringIterator {
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

//// [for-of31.js]
for (var v of new StringIterator) { }
class StringIterator {
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
