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
var E;
(function (E) {
    E[E["x"] = 0] = "x";
})(E || (E = {}));
var a;
extractIndexer((_a = {},
    _a[a] = "",
    _a)); // Should return string
extractIndexer((_a_1 = {},
    _a_1[0 /* x */] = "",
    _a_1)); // Should return string
extractIndexer((_a_2 = {},
    _a_2["" || 0] = "",
    _a_2)); // Should return any (widened form of undefined)
var _a, _a_1, _a_2;
