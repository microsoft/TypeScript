//// [ES5For-of31.ts]
var a: string, b: number;

for ({ a: b = 1, b: a = ""} of []) {
    a;
    b;
}

//// [ES5For-of31.js]
var a, b;
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    _b = _a[_i], _c = _b.a, b = _c === void 0 ? 1 : _c, _d = _b.b, a = _d === void 0 ? "" : _d;
    a;
    b;
}
var _b, _c, _d;
