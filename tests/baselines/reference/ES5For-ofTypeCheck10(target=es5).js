//// [tests/cases/conformance/statements/for-ofStatements/ES5For-ofTypeCheck10.ts] ////

//// [ES5For-ofTypeCheck10.ts]
// In ES3/5, you cannot for...of over an arbitrary iterable.
class MyStringIterator {
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

for (var v of new MyStringIterator) { }

//// [ES5For-ofTypeCheck10.js]
// In ES3/5, you cannot for...of over an arbitrary iterable.
var MyStringIterator = /** @class */ (function () {
    function MyStringIterator() {
    }
    MyStringIterator.prototype.next = function () {
        return {
            done: true,
            value: ""
        };
    };
    MyStringIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return MyStringIterator;
}());
for (var _i = 0, _a = new MyStringIterator; _i < _a.length; _i++) {
    var v = _a[_i];
}
