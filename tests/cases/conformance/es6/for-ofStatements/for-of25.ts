//@target: ES6
class StringIterator {
    [Symbol.iterator]() {
        return x;
    }
}

var x: any;
for (var v of new StringIterator) { }