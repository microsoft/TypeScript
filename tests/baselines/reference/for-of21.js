//// [for-of21.ts]
for (const v of new FooIterator) {
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

//// [for-of21.js]
for (var v of new FooIterator) {
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
