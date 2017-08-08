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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
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
    StringIterator.prototype[_a = Symbol.iterator] = function () {
        return this;
    };
    __names(StringIterator.prototype, ["next", _a]);
    return StringIterator;
    var _a;
}());
for (var _i = 0, _a = new StringIterator; _i < _a.length; _i++) {
    var v = _a[_i];
}
