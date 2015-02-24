//// [for-of26.ts]
var x: any;
for (var v of new StringIterator) { }

class StringIterator {
    next() {
        return x;
    }
    [Symbol.iterator]() {
        return this;
    }
}

//// [for-of26.js]
var x;
for (var v of new StringIterator) { }
var StringIterator = (function () {
    function StringIterator() {
    }
    StringIterator.prototype.next = function () {
        return x;
    };
    StringIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return StringIterator;
})();
