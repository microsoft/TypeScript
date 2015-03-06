//// [for-of31.ts]
for (var v of new StringIterator) { }

class StringIterator {
    next() {
        return {
            // no done property
            value: ""
        }
    }
    
    [Symbol.iterator]() {
        return this;
    }
}

//// [for-of31.js]
for (var v of new StringIterator) { }
var StringIterator = (function () {
    function StringIterator() {
    }
    StringIterator.prototype.next = function () {
        return {
            // no done property
            value: ""
        };
    };
    StringIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return StringIterator;
})();
