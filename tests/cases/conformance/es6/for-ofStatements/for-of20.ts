//@target: ES6
for (let v of new FooIterator) {
    v;
}

class Foo { }
class FooIterator {
    next() {
        return {
            value: new Foo,
            done: false
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}