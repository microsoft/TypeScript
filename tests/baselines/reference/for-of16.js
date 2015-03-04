//// [for-of16.ts]
var v: string;
for (v of new StringIterator) { } // Should fail

class StringIterator {
    [Symbol.iterator]() {
        return this;
    }
}

//// [for-of16.js]
var v;
for (v of new StringIterator) { } // Should fail
var StringIterator = (function () {
    function StringIterator() {
    }
    StringIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return StringIterator;
})();
