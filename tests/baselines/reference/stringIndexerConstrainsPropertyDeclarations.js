//// [stringIndexerConstrainsPropertyDeclarations.js]
// String indexer types constrain the types of named properties in their containing type

var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "X", {
        get: function () {
            return '';
        },
        set: function (v) {
        },
        enumerable: true,
        configurable: true
    });

    C.prototype.foo = function () {
        return '';
    };

    C.foo = function () {
    };
    Object.defineProperty(C, "X", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    return C;
})();

var a;

// error
var b = {
    a: '',
    b: 1,
    c: function () {
    },
    "d": '',
    "e": 1,
    1.0: '',
    2.0: 1,
    "3.0": '',
    "4.0": 1,
    f: null,
    get X() {
        return '';
    },
    set X(v) {
    },
    foo: function () {
        return '';
    }
};
