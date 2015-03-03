//@target: ES6
var x: any;
for (var v of new StringIterator) { }

class StringIterator {
    next() {
        return x;
    }
    [Symbol.iterator]() {
        return this;
    }
}