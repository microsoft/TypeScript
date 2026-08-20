//@target: ES6
//@noImplicitAny: true
class MyStringIterator {
    [Symbol.iterator]() {
        return v;
    }
}

for (var v of new MyStringIterator) { }