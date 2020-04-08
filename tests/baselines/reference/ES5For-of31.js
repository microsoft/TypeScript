//// [ES5For-of31.ts]
var a: string, b: number;

for ({ a: b = 1, b: a = ""} of []) {
    a;
    b;
}

//// [ES5For-of31.js]
var _a, _b, _c;
var a, b;
for (var _i = 0, _d = []; _i < _d.length; _i++) {
    _a = _d[_i], _b = _a.a, b = _b === void 0 ? 1 : _b, _c = _a.b, a = _c === void 0 ? "" : _c;
    a;
    b;
}
