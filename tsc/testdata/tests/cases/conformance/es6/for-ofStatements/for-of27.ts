//@target: ES6
class MyStringIterator {
    [Symbol.iterator]: any;
}

for (var v of new MyStringIterator) { }