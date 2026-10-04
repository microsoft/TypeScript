//@target: ES6
class MyStringIterator {
    next() {
        return x;
    }
    [Symbol.iterator]() {
        return this;
    }
}

var x: any;
for (var v of new MyStringIterator) { }