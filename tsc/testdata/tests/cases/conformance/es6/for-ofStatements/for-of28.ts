//@target: ES6
class MyStringIterator {
    next: any;
    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new MyStringIterator) { }