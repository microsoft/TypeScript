//// [computedPropertyNames48_ES5.ts]
declare function extractIndexer<T>(p: { [n: number]: T }): T;

enum E { x }

var a: any;

extractIndexer({
    [a]: ""
}); // Should return string

extractIndexer({
    [E.x]: ""
}); // Should return string

extractIndexer({
    ["" || 0]: ""
}); // Should return any (widened form of undefined)

//// [computedPropertyNames48_ES5.js]
var _a, _b, _c;
var E;
(function (E) {
    E[E["x"] = 0] = "x";
})(E || (E = {}));
var a;
extractIndexer((_a = {},
    _a[a] = "",
    _a)); // Should return string
extractIndexer((_b = {},
    _b[E.x] = "",
    _b)); // Should return string
extractIndexer((_c = {},
    _c["" || 0] = "",
    _c)); // Should return any (widened form of undefined)
