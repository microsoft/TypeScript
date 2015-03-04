//@target: ES6
var x: any;
for (var v of new StringIterator) { }

class StringIterator {
    [Symbol.iterator]() {
        return x;
    }
}