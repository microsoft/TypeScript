//// [destructuringWithLiteralInitializers2.ts]
function f00([x, y]) {}
function f01([x, y] = []) {}
function f02([x, y] = [1]) {}
function f03([x, y] = [1, 'foo']) {}

function f10([x = 0, y]) {}
function f11([x = 0, y] = []) {}
function f12([x = 0, y] = [1]) {}
function f13([x = 0, y] = [1, 'foo']) {}

function f20([x = 0, y = 'bar']) {}
function f21([x = 0, y = 'bar'] = []) {}
function f22([x = 0, y = 'bar'] = [1]) {}
function f23([x = 0, y = 'bar'] = [1, 'foo']) {}

declare const nx: number | undefined;
declare const sx: string | undefined;

function f30([x = 0, y = 'bar']) {}
function f31([x = 0, y = 'bar'] = []) {}
function f32([x = 0, y = 'bar'] = [nx]) {}
function f33([x = 0, y = 'bar'] = [nx, sx]) {}

function f40([x = 0, y = 'bar']) {}
function f41([x = 0, y = 'bar'] = []) {}
function f42([x = 0, y = 'bar'] = [sx]) {}
function f43([x = 0, y = 'bar'] = [sx, nx]) {}


//// [destructuringWithLiteralInitializers2.js]
"use strict";
function f00(_a) {
    var x = _a[0], y = _a[1];
}
function f01(_b) {
    var _c = _b === void 0 ? [] : _b, x = _c[0], y = _c[1];
}
function f02(_d) {
    var _e = _d === void 0 ? [1] : _d, x = _e[0], y = _e[1];
}
function f03(_f) {
    var _g = _f === void 0 ? [1, 'foo'] : _f, x = _g[0], y = _g[1];
}
function f10(_h) {
    var _j = _h[0], x = _j === void 0 ? 0 : _j, y = _h[1];
}
function f11(_k) {
    var _l = _k === void 0 ? [] : _k, _m = _l[0], x = _m === void 0 ? 0 : _m, y = _l[1];
}
function f12(_o) {
    var _p = _o === void 0 ? [1] : _o, _q = _p[0], x = _q === void 0 ? 0 : _q, y = _p[1];
}
function f13(_r) {
    var _s = _r === void 0 ? [1, 'foo'] : _r, _t = _s[0], x = _t === void 0 ? 0 : _t, y = _s[1];
}
function f20(_u) {
    var _v = _u[0], x = _v === void 0 ? 0 : _v, _w = _u[1], y = _w === void 0 ? 'bar' : _w;
}
function f21(_x) {
    var _y = _x === void 0 ? [] : _x, _z = _y[0], x = _z === void 0 ? 0 : _z, _0 = _y[1], y = _0 === void 0 ? 'bar' : _0;
}
function f22(_1) {
    var _2 = _1 === void 0 ? [1] : _1, _3 = _2[0], x = _3 === void 0 ? 0 : _3, _4 = _2[1], y = _4 === void 0 ? 'bar' : _4;
}
function f23(_5) {
    var _6 = _5 === void 0 ? [1, 'foo'] : _5, _7 = _6[0], x = _7 === void 0 ? 0 : _7, _8 = _6[1], y = _8 === void 0 ? 'bar' : _8;
}
function f30(_9) {
    var _10 = _9[0], x = _10 === void 0 ? 0 : _10, _11 = _9[1], y = _11 === void 0 ? 'bar' : _11;
}
function f31(_12) {
    var _13 = _12 === void 0 ? [] : _12, _14 = _13[0], x = _14 === void 0 ? 0 : _14, _15 = _13[1], y = _15 === void 0 ? 'bar' : _15;
}
function f32(_16) {
    var _17 = _16 === void 0 ? [nx] : _16, _18 = _17[0], x = _18 === void 0 ? 0 : _18, _19 = _17[1], y = _19 === void 0 ? 'bar' : _19;
}
function f33(_20) {
    var _21 = _20 === void 0 ? [nx, sx] : _20, _22 = _21[0], x = _22 === void 0 ? 0 : _22, _23 = _21[1], y = _23 === void 0 ? 'bar' : _23;
}
function f40(_24) {
    var _25 = _24[0], x = _25 === void 0 ? 0 : _25, _26 = _24[1], y = _26 === void 0 ? 'bar' : _26;
}
function f41(_27) {
    var _28 = _27 === void 0 ? [] : _27, _29 = _28[0], x = _29 === void 0 ? 0 : _29, _30 = _28[1], y = _30 === void 0 ? 'bar' : _30;
}
function f42(_31) {
    var _32 = _31 === void 0 ? [sx] : _31, _33 = _32[0], x = _33 === void 0 ? 0 : _33, _34 = _32[1], y = _34 === void 0 ? 'bar' : _34;
}
function f43(_35) {
    var _36 = _35 === void 0 ? [sx, nx] : _35, _37 = _36[0], x = _37 === void 0 ? 0 : _37, _38 = _36[1], y = _38 === void 0 ? 'bar' : _38;
}
