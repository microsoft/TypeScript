//// [accessorWithES3.ts]
// error to use accessors in ES3 mode

class C {
    get x() {
        return 1;
    }
}

class D {
    set x(v) {
    }
}

var x = {
    get a() { return 1 }
}

var y = {
    set b(v) { }
}

//// [accessorWithES3.js]
// error to use accessors in ES3 mode
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "x", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    Object.defineProperty(D.prototype, "x", {
        set: function (v) {
        },
        enumerable: false,
        configurable: true
    });
    return D;
}());
var x = {
    get a() { return 1; }
};
var y = {
    set b(v) { }
};
