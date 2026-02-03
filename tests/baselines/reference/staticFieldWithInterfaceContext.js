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
let c = (_a = class {
    },
    __setFunctionName(_a, "c"),
    // should typecheck the same as the last line
    _a.x = { a: "a" },
    _a);
c.x = { a: "a" };
const ex = "x";
let c2 = (_b = class {
    },
    _c = ex,
    __setFunctionName(_b, "c2"),
    _b[_c] = { a: "a" },
    _b);
c[ex] = { a: "a" };
function f(c = (_r = class {
    },
    __setFunctionName(_r, "c"),
    _r.x = { a: "a" },
    _r)) { var _r; }
let { c: c3 } = { c: (_d = class {
        },
        __setFunctionName(_d, "c"),
        _d.x = { a: "a" },
        _d) };
let { c: c4 = (_e = class {
    },
    __setFunctionName(_e, "c4"),
    _e.x = { a: "a" },
    _e) } = {};
let { c: c5 = (_f = class {
    },
    __setFunctionName(_f, "c5"),
    _f.x = { a: "a" },
    _f) } = { c: (_g = class {
        },
        __setFunctionName(_g, "c"),
        _g.x = { a: "a" },
        _g) };
let [c6] = [(_h = class {
        },
        _h.x = { a: "a" },
        _h)];
let [c7] = [(_j = class {
        },
        _j.x = { a: "a" },
        _j)];
let [c8 = (_k = class {
    },
    __setFunctionName(_k, "c8"),
    _k.x = { a: "a" },
    _k)] = [];
let [c9 = (_l = class {
    },
    __setFunctionName(_l, "c9"),
    _l.x = { a: "a" },
    _l)] = [];
let [c10 = (_m = class {
    },
    __setFunctionName(_m, "c10"),
    _m.x = { a: "a" },
    _m)] = [(_o = class {
        },
        _o.x = { a: "a" },
        _o)];
let [c11 = (_p = class {
    },
    __setFunctionName(_p, "c11"),
    _p.x = { a: "a" },
    _p)] = [(_q = class {
        },
        _q.x = { a: "a" },
        _q)];
