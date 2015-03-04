//@target: ES6
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