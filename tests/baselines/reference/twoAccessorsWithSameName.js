//// [twoAccessorsWithSameName.ts]
class C {
    get x() { return 1; }
    get x() { return 1; } // error
}

class D {
    set x(v) {  }
    set x(v) {  } // error
}

class E {
    get x() {
        return 1;
    }
    set x(v) { }
}

var x = {
    get x() {
        return 1;
    },

    // error
    get x() {
        return 1;
    }
}

var y = {
    get x() {
        return 1;
    },
    set x(v) { }
}

//// [twoAccessorsWithSameName.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    Object.defineProperty(proto_1, "x", {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    return C;
}());
var D = (function () {
    function D() {
    }
    var proto_2 = D.prototype;
    Object.defineProperty(proto_2, "x", {
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    return D;
}());
var E = (function () {
    function E() {
    }
    var proto_3 = E.prototype;
    Object.defineProperty(proto_3, "x", {
        get: function () {
            return 1;
        },
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    return E;
}());
var x = {
    get x() {
        return 1;
    },
    // error
    get x() {
        return 1;
    }
};
var y = {
    get x() {
        return 1;
    },
    set x(v) { }
};
