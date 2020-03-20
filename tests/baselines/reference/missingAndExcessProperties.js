//// [missingAndExcessProperties.ts]
// Missing properties
function f1() {
    var { x, y } = {};
    var { x = 1, y } = {};
    var { x, y = 1 } = {};
    var { x = 1, y = 1 } = {};
}

// Missing properties
function f2() {
    var x: number, y: number;
    ({ x, y } = {});
    ({ x: x = 1, y } = {});
    ({ x, y: y = 1 } = {});
    ({ x: x = 1, y: y = 1 } = {});
}

// Excess properties
function f3() {
    var { } = { x: 0, y: 0 };
    var { x } = { x: 0, y: 0 };
    var { y } = { x: 0, y: 0 };
    var { x, y } = { x: 0, y: 0 };
}

// Excess properties
function f4() {
    var x: number, y: number;
    ({ } = { x: 0, y: 0 });
    ({ x } = { x: 0, y: 0 });
    ({ y } = { x: 0, y: 0 });
    ({ x, y } = { x: 0, y: 0 });
}


//// [missingAndExcessProperties.js]
// Missing properties
function f1() {
    var _a = {}, x = _a.x, y = _a.y;
    var _b = {}, _c = _b.x, x = _c === void 0 ? 1 : _c, y = _b.y;
    var _d = {}, x = _d.x, _e = _d.y, y = _e === void 0 ? 1 : _e;
    var _f = {}, _g = _f.x, x = _g === void 0 ? 1 : _g, _h = _f.y, y = _h === void 0 ? 1 : _h;
}
// Missing properties
function f2() {
    var _j, _k, _l, _m, _o, _p, _q, _r;
    var x, y;
    (_j = {}, x = _j.x, y = _j.y);
    (_k = {}, _l = _k.x, x = _l === void 0 ? 1 : _l, y = _k.y);
    (_m = {}, x = _m.x, _o = _m.y, y = _o === void 0 ? 1 : _o);
    (_p = {}, _q = _p.x, x = _q === void 0 ? 1 : _q, _r = _p.y, y = _r === void 0 ? 1 : _r);
}
// Excess properties
function f3() {
    var _s = { x: 0, y: 0 };
    var x = { x: 0, y: 0 }.x;
    var y = { x: 0, y: 0 }.y;
    var _t = { x: 0, y: 0 }, x = _t.x, y = _t.y;
}
// Excess properties
function f4() {
    var _u;
    var x, y;
    ({ x: 0, y: 0 });
    (x = { x: 0, y: 0 }.x);
    (y = { x: 0, y: 0 }.y);
    (_u = { x: 0, y: 0 }, x = _u.x, y = _u.y);
}
