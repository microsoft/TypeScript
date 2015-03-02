//// [for-of20.ts]
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

//// [for-of20.js]
for (let v of new FooIterator) {
    v;
}
var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();
var FooIterator = (function () {
    function FooIterator() {
    }
    FooIterator.prototype.next = function () {
        return {
            value: new Foo,
            done: false
        };
    };
    FooIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return FooIterator;
})();
