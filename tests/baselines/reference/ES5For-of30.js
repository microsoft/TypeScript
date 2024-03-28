//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of30.ts] ////

//// [ES5For-of30.ts]
var a: string, b: number;
var tuple: [number, string] = [2, "3"];
for ([a = 1, b = ""] of tuple) {
    a;
    b;
}

//// [ES5For-of30.js]
var _a, _b, _c;
var a, b;
var tuple = [2, "3"];
for (var _i = 0, tuple_1 = tuple; _i < tuple_1.length; _i++) {
    _a = tuple_1[_i], _b = _a[0], a = _b === void 0 ? 1 : _b, _c = _a[1], b = _c === void 0 ? "" : _c;
    a;
    b;
}
