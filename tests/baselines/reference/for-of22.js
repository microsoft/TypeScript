//// [for-of22.ts]
v;
for (var v of new FooIterator) {
    
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

//// [for-of22.js]
v;
for (var v of new FooIterator) {
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
