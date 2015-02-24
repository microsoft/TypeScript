//// [for-of28.ts]
for (var v of new StringIterator) { }

class StringIterator {
    next: any;
    [Symbol.iterator]() {
        return this;
    }
}

//// [for-of28.js]
for (var v of new StringIterator) { }
var StringIterator = (function () {
    function StringIterator() {
    }
    StringIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return StringIterator;
})();
