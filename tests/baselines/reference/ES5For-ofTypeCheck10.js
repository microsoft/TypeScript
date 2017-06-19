//// [ES5For-ofTypeCheck10.ts]
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

for (var v of new StringIterator) { }

//// [ES5For-ofTypeCheck10.js]
// In ES3/5, you cannot for...of over an arbitrary iterable.
var StringIterator = /** @class */ (function () {
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
for (var _i = 0, _a = new StringIterator; _i < _a.length; _i++) {
    var v = _a[_i];
}
