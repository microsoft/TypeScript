//// [ES5For-ofTypeCheck10.ts]
for (var v of new StringIterator) { }

// In ES3/5, you cannot for...of over an arbitrary iterable.
class StringIterator {
    next() {
        return {
            done: true,
            value: ""
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}

//// [ES5For-ofTypeCheck10.js]
for (var _i = 0, _a = new StringIterator; _i < _a.length; _i++) {
    var v = _a[_i];
}
// In ES3/5, you cannot for...of over an arbitrary iterable.
var StringIterator = (function () {
    function StringIterator() {
    }
    StringIterator.prototype.next = function () {
        return {
            done: true,
            value: ""
        };
    };
    StringIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return StringIterator;
}());
