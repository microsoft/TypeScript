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
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "x", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    return C;
}());
var D = (function () {
    function D() {
    }
    Object.defineProperty(D.prototype, "x", {
        set: function (v) {
        },
        enumerable: true,
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
