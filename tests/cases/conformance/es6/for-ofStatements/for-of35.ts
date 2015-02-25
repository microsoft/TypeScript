//@target: ES6
//@noImplicitAny: true
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