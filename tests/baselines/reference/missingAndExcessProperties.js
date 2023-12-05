//// [tests/cases/conformance/es6/destructuring/missingAndExcessProperties.ts] ////

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
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var x, y;
    (_a = {}, x = _a.x, y = _a.y);
    (_b = {}, _c = _b.x, x = _c === void 0 ? 1 : _c, y = _b.y);
    (_d = {}, x = _d.x, _e = _d.y, y = _e === void 0 ? 1 : _e);
    (_f = {}, _g = _f.x, x = _g === void 0 ? 1 : _g, _h = _f.y, y = _h === void 0 ? 1 : _h);
}
// Excess properties
function f3() {
    var _a = { x: 0, y: 0 };
    var x = { x: 0, y: 0 }.x;
    var y = { x: 0, y: 0 }.y;
    var _b = { x: 0, y: 0 }, x = _b.x, y = _b.y;
}
// Excess properties
function f4() {
    var _a;
    var x, y;
    ({ x: 0, y: 0 });
    (x = { x: 0, y: 0 }.x);
    (y = { x: 0, y: 0 }.y);
    (_a = { x: 0, y: 0 }, x = _a.x, y = _a.y);
}
