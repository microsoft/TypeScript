//// [ES5For-of30.ts]
var a: string, b: number;
var tuple: [number, string] = [2, "3"];
for ([a = 1, b = ""] of tuple) {
    a;
    b;
}

//// [ES5For-of30.js]
var a, b;
var tuple = [2, "3"];
for (var _i = 0; _i < tuple.length; _i++) {
    _a = tuple[_i], _b = _a[0], a = _b === void 0 ? 1 : _b, _c = _a[1], b = _c === void 0 ? "" : _c;
    a;
    b;
}
var _a, _b, _c;
