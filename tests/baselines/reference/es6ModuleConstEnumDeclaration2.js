//// [es6ModuleConstEnumDeclaration2.ts]

export const enum e1 {
    a,
    b,
    c
}
const enum e2 {
    x,
    y,
    z
}
var x = e1.a;
var y = e2.x;
export module m1 {
    export const enum e3 {
        a,
        b,
        c
    }
    const enum e4 {
        x,
        y,
        z
    }
    var x1 = e1.a;
    var y1 = e2.x;
    var x2 = e3.a;
    var y2 = e4.x;
}
module m2 {
    export const enum e5 {
        a,
        b,
        c
    }
    const enum e6 {
        x,
        y,
        z
    }
    var x1 = e1.a;
    var y1 = e2.x;
    var x2 = e5.a;
    var y2 = e6.x;
    var x3 = m1.e3.a;
}

//// [es6ModuleConstEnumDeclaration2.js]
export var e1;
(function (e1) {
    e1[e1["a"] = 0] = "a";
    e1[e1["b"] = 1] = "b";
    e1[e1["c"] = 2] = "c";
})(e1 || (e1 = {}));
var e2;
(function (e2) {
    e2[e2["x"] = 0] = "x";
    e2[e2["y"] = 1] = "y";
    e2[e2["z"] = 2] = "z";
})(e2 || (e2 = {}));
var x = 0 /* a */;
var y = 0 /* x */;
export var m1;
(function (m1) {
    var e3;
    (function (e3) {
        e3[e3["a"] = 0] = "a";
        e3[e3["b"] = 1] = "b";
        e3[e3["c"] = 2] = "c";
    })(e3 = m1.e3 || (m1.e3 = {}));
    var e4;
    (function (e4) {
        e4[e4["x"] = 0] = "x";
        e4[e4["y"] = 1] = "y";
        e4[e4["z"] = 2] = "z";
    })(e4 || (e4 = {}));
    var x1 = 0 /* a */;
    var y1 = 0 /* x */;
    var x2 = 0 /* a */;
    var y2 = 0 /* x */;
})(m1 || (m1 = {}));
var m2;
(function (m2) {
    var e5;
    (function (e5) {
        e5[e5["a"] = 0] = "a";
        e5[e5["b"] = 1] = "b";
        e5[e5["c"] = 2] = "c";
    })(e5 = m2.e5 || (m2.e5 = {}));
    var e6;
    (function (e6) {
        e6[e6["x"] = 0] = "x";
        e6[e6["y"] = 1] = "y";
        e6[e6["z"] = 2] = "z";
    })(e6 || (e6 = {}));
    var x1 = 0 /* a */;
    var y1 = 0 /* x */;
    var x2 = 0 /* a */;
    var y2 = 0 /* x */;
    var x3 = 0 /* a */;
})(m2 || (m2 = {}));
