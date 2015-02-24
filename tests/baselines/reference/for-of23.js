//// [for-of23.ts]
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

//// [for-of23.js]
for (var v of new FooIterator) {
    const v = 0; // new scope
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
