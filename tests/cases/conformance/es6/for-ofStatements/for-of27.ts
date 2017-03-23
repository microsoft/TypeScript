//@target: ES6
class StringIterator {
    [Symbol.iterator]: any;
}

for (var v of new StringIterator) { }