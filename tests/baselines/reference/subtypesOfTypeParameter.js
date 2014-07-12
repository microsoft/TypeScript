//// [subtypesOfTypeParameter.js]
// checking whether other types are subtypes of type parameters
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C3 = (function () {
    function C3() {
    }
    return C3;
})();

var D1 = (function (_super) {
    __extends(D1, _super);
    function D1() {
        _super.apply(this, arguments);
    }
    return D1;
})(C3);

function f1(x, y) {
    var r = true ? x : y;
    var r = true ? y : x;
}

var C1 = (function () {
    function C1() {
    }
    return C1;
})();
var C2 = (function () {
    function C2() {
    }
    return C2;
})();
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
function f() {
}
var f;
(function (f) {
    f.bar = 1;
})(f || (f = {}));
var c = (function () {
    function c() {
    }
    return c;
})();
var c;
(function (c) {
    c.bar = 1;
})(c || (c = {}));

// errors throughout
function f2(x, y) {
    var r0 = true ? x : null;
    var r0 = true ? null : x;

    var u;
    var r0b = true ? u : x;
    var r0b = true ? x : u;

    var r1 = true ? 1 : x;
    var r1 = true ? x : 1;

    var r2 = true ? '' : x;
    var r2 = true ? x : '';

    var r3 = true ? true : x;
    var r3 = true ? x : true;

    var r4 = true ? new Date() : x;
    var r4 = true ? x : new Date();

    var r5 = true ? /1/ : x;
    var r5 = true ? x : /1/;

    var r6 = true ? { foo: 1 } : x;
    var r6 = true ? x : { foo: 1 };

    var r7 = true ? function () {
    } : x;
    var r7 = true ? x : function () {
    };

    var r8 = true ? function (x) {
        return x;
    } : x;
    var r8b = true ? x : function (x) {
        return x;
    };

    var i1;
    var r9 = true ? i1 : x;
    var r9 = true ? x : i1;

    var c1;
    var r10 = true ? c1 : x;
    var r10 = true ? x : c1;

    var c2;
    var r12 = true ? c2 : x;
    var r12 = true ? x : c2;

    var r13 = true ? E : x;
    var r13 = true ? x : E;

    var r14 = true ? 0 /* A */ : x;
    var r14 = true ? x : 0 /* A */;

    var af;
    var r15 = true ? af : x;
    var r15 = true ? x : af;

    var ac;
    var r16 = true ? ac : x;
    var r16 = true ? x : ac;

    function f17(a) {
        var r17 = true ? x : a;
        var r17 = true ? a : x;
    }

    function f18(a) {
        var r18 = true ? x : a;
        var r18 = true ? a : x;
    }

    var r19 = true ? new Object() : x;
    var r19 = true ? x : new Object();

    var r20 = true ? {} : x;
    var r20 = true ? x : {};
}
