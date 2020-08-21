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

// These are broken because of #40158
// let [ c8 = class { static x = { a: "a" } } ]: [I?] = [];
// let [ c9 = class { static x = { a: "a" } } ]: I[] = [];
// let [ c10 = class { static x = { a: "a" } } ]: [I?] = [class { static x = { a: "a" } }];
// let [ c11 = class { static x = { a: "a" } } ]: I[] = [class { static x = { a: "a" } }];


//// [staticFieldWithInterfaceContext.js]
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
var c = (_a = /** @class */ (function () {
        function class_1() {
        }
        return class_1;
    }()),
    // should typecheck the same as the last line
    _a.x = { a: "a" },
    _a);
c.x = { a: "a" };
var ex = "x";
var c2 = (_c = /** @class */ (function () {
        function class_2() {
        }
        return class_2;
    }()),
    _b = ex,
    _c[_b] = { a: "a" },
    _c);
c[ex] = { a: "a" };
function f(c) {
    var _a;
    if (c === void 0) { c = (_a = /** @class */ (function () {
            function class_3() {
            }
            return class_3;
        }()),
        _a.x = { a: "a" },
        _a); }
}
var c3 = { c: (_d = /** @class */ (function () {
            function class_4() {
            }
            return class_4;
        }()),
        _d.x = { a: "a" },
        _d) }.c;
var _k = {}.c, c4 = _k === void 0 ? (_e = /** @class */ (function () {
        function class_5() {
        }
        return class_5;
    }()),
    _e.x = { a: "a" },
    _e) : _k;
var _l = { c: (_g = /** @class */ (function () {
            function class_6() {
            }
            return class_6;
        }()),
        _g.x = { a: "a" },
        _g) }.c, c5 = _l === void 0 ? (_f = /** @class */ (function () {
        function class_7() {
        }
        return class_7;
    }()),
    _f.x = { a: "a" },
    _f) : _l;
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
// These are broken because of #40158
// let [ c8 = class { static x = { a: "a" } } ]: [I?] = [];
// let [ c9 = class { static x = { a: "a" } } ]: I[] = [];
// let [ c10 = class { static x = { a: "a" } } ]: [I?] = [class { static x = { a: "a" } }];
// let [ c11 = class { static x = { a: "a" } } ]: I[] = [class { static x = { a: "a" } }];
