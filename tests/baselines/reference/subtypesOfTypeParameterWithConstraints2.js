//// [subtypesOfTypeParameterWithConstraints2.js]
// checking whether other types are subtypes of type parameters with constraints
function f1(x, y) {
    var r = true ? x : y;
    var r = true ? y : x;
}

// V > U > T
function f2(x, y, z) {
    var r = true ? x : y;
    var r = true ? y : x;

    // ok
    var r2 = true ? z : y;
    var r2 = true ? y : z;

    // ok
    var r2 = true ? z : x;
    var r2 = true ? x : z;
}

// Date > U > T
function f3(x, y) {
    var r = true ? x : y;
    var r = true ? y : x;

    // ok
    var r2 = true ? x : new Date();
    var r2 = true ? new Date() : x;

    // ok
    var r3 = true ? y : new Date();
    var r3 = true ? new Date() : y;
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

function f4(x) {
    var r0 = true ? x : null;
    var r0 = true ? null : x;

    var u;
    var r0b = true ? u : x;
    var r0b = true ? x : u;
}

function f5(x) {
    var r1 = true ? 1 : x;
    var r1 = true ? x : 1;
}

function f6(x) {
    var r2 = true ? '' : x;
    var r2 = true ? x : '';
}

function f7(x) {
    var r3 = true ? true : x;
    var r3 = true ? x : true;
}

function f8(x) {
    var r4 = true ? new Date() : x;
    var r4 = true ? x : new Date();
}

function f9(x) {
    var r5 = true ? /1/ : x;
    var r5 = true ? x : /1/;
}

function f10(x) {
    var r6 = true ? { foo: 1 } : x;
    var r6 = true ? x : { foo: 1 };
}

function f11(x) {
    var r7 = true ? function () {
    } : x;
    var r7 = true ? x : function () {
    };
}

function f12(x) {
    var r8 = true ? function (x) {
        return x;
    } : x;
    var r8b = true ? x : function (x) {
        return x;
    };
}

function f13(x) {
    var i1;
    var r9 = true ? i1 : x;
    var r9 = true ? x : i1;
}

function f14(x) {
    var c1;
    var r10 = true ? c1 : x;
    var r10 = true ? x : c1;
}

function f15(x) {
    var c2;
    var r12 = true ? c2 : x;
    var r12 = true ? x : c2;
}

function f16(x) {
    var r13 = true ? E : x;
    var r13 = true ? x : E;

    var r14 = true ? 0 /* A */ : x;
    var r14 = true ? x : 0 /* A */;
}

function f17(x) {
    var af;
    var r15 = true ? af : x;
    var r15 = true ? x : af;
}

function f18(x) {
    var ac;
    var r16 = true ? ac : x;
    var r16 = true ? x : ac;
}

function f19(x) {
    function f17(a) {
        var r17 = true ? x : a;
        var r17 = true ? a : x;
    }

    function f18(a) {
        var r18 = true ? x : a;
        var r18 = true ? a : x;
    }
}

function f20(x) {
    var r19 = true ? new Object() : x;
    var r19 = true ? x : new Object();
}

function f21(x) {
    var r20 = true ? {} : x;
    var r20 = true ? x : {};
}
