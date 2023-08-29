//// [tests/cases/compiler/staticFieldWithInterfaceContext.ts] ////

//// [staticFieldWithInterfaceContext.ts]
interface I {
    x: { a: "a" };
}
let c: I = class {
    // should typecheck the same as the last line
    static x = { a: "a" };
};
c.x = { a: "a" };

const ex = "x";
let c2: I = class { static [ex] = { a: "a" }; };
c[ex] = { a: "a" };

function f(c: I = class { static x = { a: "a" } }) { }

let { c: c3 }: { c: I } = { c: class { static x = { a: "a" } } };
let { c: c4 = class { static x = { a: "a" } }}: { c?: I } = { };
let { c: c5 = class { static x = { a: "a" } }}: { c?: I } = { c: class { static x = { a: "a" } } };
let [ c6 ]: [I] = [class { static x = { a: "a" } }];
let [ c7 ]: I[] = [class { static x = { a: "a" } }];

let [ c8 = class { static x = { a: "a" } } ]: [I?] = [];
let [ c9 = class { static x = { a: "a" } } ]: I[] = [];
let [ c10 = class { static x = { a: "a" } } ]: [I?] = [class { static x = { a: "a" } }];
let [ c11 = class { static x = { a: "a" } } ]: I[] = [class { static x = { a: "a" } }];


//// [staticFieldWithInterfaceContext.js]
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
var c = (_a = /** @class */ (function () {
        function class_1() {
        }
        return class_1;
    }()),
    __setFunctionName(_a, "c"),
    // should typecheck the same as the last line
    _a.x = { a: "a" },
    _a);
c.x = { a: "a" };
var ex = "x";
var c2 = (_b = /** @class */ (function () {
        function class_2() {
        }
        return class_2;
    }()),
    _c = ex,
    __setFunctionName(_b, "c2"),
    _b[_c] = { a: "a" },
    _b);
c[ex] = { a: "a" };
function f(c) {
    var _r;
    if (c === void 0) { c = (_r = /** @class */ (function () {
            function class_3() {
            }
            return class_3;
        }()),
        __setFunctionName(_r, "c"),
        _r.x = { a: "a" },
        _r); }
}
var c3 = { c: (_d = /** @class */ (function () {
            function class_4() {
            }
            return class_4;
        }()),
        __setFunctionName(_d, "c"),
        _d.x = { a: "a" },
        _d) }.c;
var _r = {}.c, c4 = _r === void 0 ? (_e = /** @class */ (function () {
        function class_5() {
        }
        return class_5;
    }()),
    __setFunctionName(_e, "c4"),
    _e.x = { a: "a" },
    _e) : _r;
var _s = { c: (_g = /** @class */ (function () {
            function class_6() {
            }
            return class_6;
        }()),
        __setFunctionName(_g, "c"),
        _g.x = { a: "a" },
        _g) }.c, c5 = _s === void 0 ? (_f = /** @class */ (function () {
        function class_7() {
        }
        return class_7;
    }()),
    __setFunctionName(_f, "c5"),
    _f.x = { a: "a" },
    _f) : _s;
var c6 = [(_h = /** @class */ (function () {
            function class_8() {
            }
            return class_8;
        }()),
        _h.x = { a: "a" },
        _h)][0];
var c7 = [(_j = /** @class */ (function () {
            function class_9() {
            }
            return class_9;
        }()),
        _j.x = { a: "a" },
        _j)][0];
var _t = [][0], c8 = _t === void 0 ? (_k = /** @class */ (function () {
        function class_10() {
        }
        return class_10;
    }()),
    __setFunctionName(_k, "c8"),
    _k.x = { a: "a" },
    _k) : _t;
var _u = [][0], c9 = _u === void 0 ? (_l = /** @class */ (function () {
        function class_11() {
        }
        return class_11;
    }()),
    __setFunctionName(_l, "c9"),
    _l.x = { a: "a" },
    _l) : _u;
var _v = [(_o = /** @class */ (function () {
            function class_12() {
            }
            return class_12;
        }()),
        _o.x = { a: "a" },
        _o)][0], c10 = _v === void 0 ? (_m = /** @class */ (function () {
        function class_13() {
        }
        return class_13;
    }()),
    __setFunctionName(_m, "c10"),
    _m.x = { a: "a" },
    _m) : _v;
var _w = [(_q = /** @class */ (function () {
            function class_14() {
            }
            return class_14;
        }()),
        _q.x = { a: "a" },
        _q)][0], c11 = _w === void 0 ? (_p = /** @class */ (function () {
        function class_15() {
        }
        return class_15;
    }()),
    __setFunctionName(_p, "c11"),
    _p.x = { a: "a" },
    _p) : _w;
