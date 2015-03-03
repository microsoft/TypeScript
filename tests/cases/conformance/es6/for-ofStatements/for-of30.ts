//@target: ES6
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