//@target: ES6
class MyStringIterator {
    [Symbol.iterator]() {
        return x;
    }
}

var x: any;
for (var v of new MyStringIterator) { }