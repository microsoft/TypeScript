//// [for-of34.ts]
for (var v of new StringIterator) { }

class StringIterator {
    next() {
        return v;
    }
    
    [Symbol.iterator]() {
        return this;
    }
}

//// [for-of34.js]
for (var v of new StringIterator) { }
var StringIterator = (function () {
    function StringIterator() {
    }
    StringIterator.prototype.next = function () {
        return v;
    };
    StringIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return StringIterator;
})();
