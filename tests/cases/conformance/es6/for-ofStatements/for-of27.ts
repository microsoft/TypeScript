//@target: ES6
for (var v of new StringIterator) { }

class StringIterator {
    [Symbol.iterator]: any;
}