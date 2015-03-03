//// [for-of35.ts]
for (var v of new StringIterator) { }

class StringIterator {
    next() {
        return {
            done: true,
            value: v
        }
    }
    
    [Symbol.iterator]() {
        return this;
    }
}

//// [for-of35.js]
for (var v of new StringIterator) { }
var StringIterator = (function () {
    function StringIterator() {
    }
    StringIterator.prototype.next = function () {
        return {
            done: true,
            value: v
        };
    };
    StringIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return StringIterator;
})();
