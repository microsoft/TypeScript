//@target: ES6
for (var v of new StringIterator) { }

class StringIterator {
    next: any;
    [Symbol.iterator]() {
        return this;
    }
}