//// [for-of33.ts]
for (var v of new StringIterator) { }

class StringIterator {
    [Symbol.iterator]() {
        return v;
    }
}

//// [for-of33.js]
for (var v of new StringIterator) { }
var StringIterator = (function () {
    function StringIterator() {
    }
    StringIterator.prototype[Symbol.iterator] = function () {
        return v;
    };
    return StringIterator;
})();
