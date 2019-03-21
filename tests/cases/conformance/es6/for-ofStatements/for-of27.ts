//@target: ES6
class _StringIterator {
    [Symbol.iterator]: any;
}

for (var v of new _StringIterator) { }