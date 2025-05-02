//// [tests/cases/conformance/es6/moduleExportsSystem/topLevelVarHoistingCommonJS.ts] ////

//// [topLevelVarHoistingCommonJS.ts]
declare var _: any;

{
    var a = _;
}

if (_) {
    var b = _;
}
else {
    var c = _;
}

switch (_) {
    case _:
        var d = _;
    default:
        var e = _;
}

while (_) {
    var f = _;
}

do {
    var g = _;
}
while (_);

for (var h = _; ;) {
    break;
}

for (; ;) {
    var m = _;
    break;
}

for (var n in _) break;

for (_ in _) {
    var o = _;
}

for (var p of _) break;

for (_ of _) {
    var u = _;
}

try {
    var v = _;
}
catch {
    var w = _;
}

label: {
    var x = _;
    break label;
}

// @ts-ignore
with (_) {
    var y = _;
}

var z = _;

export { a, b, c, d, e, f, g, h, m, n, o, p, u, v, w, x, y, z };

//// [topLevelVarHoistingCommonJS.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = exports.y = exports.x = exports.w = exports.v = exports.u = exports.p = exports.o = exports.n = exports.m = exports.h = exports.g = exports.f = exports.e = exports.d = exports.c = exports.b = exports.a = void 0;
{
    var a = _;
    exports.a = a;
}
if (_) {
    var b = _;
    exports.b = b;
}
else {
    var c = _;
    exports.c = c;
}
switch (_) {
    case _:
        var d = _;
        exports.d = d;
    default:
        var e = _;
        exports.e = e;
}
while (_) {
    var f = _;
    exports.f = f;
}
do {
    var g = _;
    exports.g = g;
} while (_);
var h = _;
exports.h = h;
for (;;) {
    break;
}
for (;;) {
    var m = _;
    exports.m = m;
    break;
}
for (var n in _) {
    exports.n = n;
    break;
}
for (_ in _) {
    var o = _;
    exports.o = o;
}
for (var p of _) {
    exports.p = p;
    break;
}
for (_ of _) {
    var u = _;
    exports.u = u;
}
try {
    var v = _;
    exports.v = v;
}
catch {
    var w = _;
    exports.w = w;
}
label: {
    var x = _;
    exports.x = x;
    break label;
}
// @ts-ignore
with (_) {
    var y = _;
    exports.y = y;
}
var z = _;
exports.z = z;
