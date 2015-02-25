//// [for-of30.ts]
for (var v of new StringIterator) { }

class StringIterator {
    next() {
        return {
            done: false,
            value: ""
        }
    }
    
    return = 0;
    
    [Symbol.iterator]() {
        return this;
    }
}

//// [for-of30.js]
for (var v of new StringIterator) { }
var StringIterator = (function () {
    function StringIterator() {
        this.return = 0;
    }
    StringIterator.prototype.next = function () {
        return {
            done: false,
            value: ""
        };
    };
    StringIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return StringIterator;
})();
