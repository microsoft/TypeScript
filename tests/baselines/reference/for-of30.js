//// [for-of30.ts]
for (var v of new StringIterator) { }

class StringIterator {
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

//// [for-of30.js]
for (var v of new StringIterator) { }
class StringIterator {
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
