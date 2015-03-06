//// [for-of17.ts]
var v: string;
for (v of new NumberIterator) { } // Should succeed

class NumberIterator {
    next() {
        return {
            value: 0,
            done: false
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}

//// [for-of17.js]
var v;
for (v of new NumberIterator) { } // Should succeed
var NumberIterator = (function () {
    function NumberIterator() {
    }
    NumberIterator.prototype.next = function () {
        return {
            value: 0,
            done: false
        };
    };
    NumberIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return NumberIterator;
})();
