//@target: ES6
class MyStringIterator {
    next() {
        return "";
    }
}

var v: string;
for (v of new MyStringIterator) { } // Should fail because the iterator is not iterable