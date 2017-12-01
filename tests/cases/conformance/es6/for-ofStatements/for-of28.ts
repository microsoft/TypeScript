//@target: ES6
class StringIterator {
    next: any;
    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new StringIterator) { }