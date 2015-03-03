//@target: ES6
for (const v of new FooIterator) {
    const v = 0; // new scope
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