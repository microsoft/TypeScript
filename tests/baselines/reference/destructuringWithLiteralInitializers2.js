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
function f01(_a) {
    var _b = _a === void 0 ? [] : _a, x = _b[0], y = _b[1];
}
function f02(_a) {
    var _b = _a === void 0 ? [1] : _a, x = _b[0], y = _b[1];
}
function f03(_a) {
    var _b = _a === void 0 ? [1, 'foo'] : _a, x = _b[0], y = _b[1];
}
function f10(_a) {
    var _b = _a[0], x = _b === void 0 ? 0 : _b, y = _a[1];
}
function f11(_a) {
    var _b = _a === void 0 ? [] : _a, _c = _b[0], x = _c === void 0 ? 0 : _c, y = _b[1];
}
function f12(_a) {
    var _b = _a === void 0 ? [1] : _a, _c = _b[0], x = _c === void 0 ? 0 : _c, y = _b[1];
}
function f13(_a) {
    var _b = _a === void 0 ? [1, 'foo'] : _a, _c = _b[0], x = _c === void 0 ? 0 : _c, y = _b[1];
}
function f20(_a) {
    var _b = _a[0], x = _b === void 0 ? 0 : _b, _c = _a[1], y = _c === void 0 ? 'bar' : _c;
}
function f21(_a) {
    var _b = _a === void 0 ? [] : _a, _c = _b[0], x = _c === void 0 ? 0 : _c, _d = _b[1], y = _d === void 0 ? 'bar' : _d;
}
function f22(_a) {
    var _b = _a === void 0 ? [1] : _a, _c = _b[0], x = _c === void 0 ? 0 : _c, _d = _b[1], y = _d === void 0 ? 'bar' : _d;
}
function f23(_a) {
    var _b = _a === void 0 ? [1, 'foo'] : _a, _c = _b[0], x = _c === void 0 ? 0 : _c, _d = _b[1], y = _d === void 0 ? 'bar' : _d;
}
function f30(_a) {
    var _b = _a[0], x = _b === void 0 ? 0 : _b, _c = _a[1], y = _c === void 0 ? 'bar' : _c;
}
function f31(_a) {
    var _b = _a === void 0 ? [] : _a, _c = _b[0], x = _c === void 0 ? 0 : _c, _d = _b[1], y = _d === void 0 ? 'bar' : _d;
}
function f32(_a) {
    var _b = _a === void 0 ? [nx] : _a, _c = _b[0], x = _c === void 0 ? 0 : _c, _d = _b[1], y = _d === void 0 ? 'bar' : _d;
}
function f33(_a) {
    var _b = _a === void 0 ? [nx, sx] : _a, _c = _b[0], x = _c === void 0 ? 0 : _c, _d = _b[1], y = _d === void 0 ? 'bar' : _d;
}
function f40(_a) {
    var _b = _a[0], x = _b === void 0 ? 0 : _b, _c = _a[1], y = _c === void 0 ? 'bar' : _c;
}
function f41(_a) {
    var _b = _a === void 0 ? [] : _a, _c = _b[0], x = _c === void 0 ? 0 : _c, _d = _b[1], y = _d === void 0 ? 'bar' : _d;
}
function f42(_a) {
    var _b = _a === void 0 ? [sx] : _a, _c = _b[0], x = _c === void 0 ? 0 : _c, _d = _b[1], y = _d === void 0 ? 'bar' : _d;
}
function f43(_a) {
    var _b = _a === void 0 ? [sx, nx] : _a, _c = _b[0], x = _c === void 0 ? 0 : _c, _d = _b[1], y = _d === void 0 ? 'bar' : _d;
}
