//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames48_ES6.ts] ////

//// [computedPropertyNames48_ES6.ts]
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

//// [computedPropertyNames48_ES6.js]
var E;
(function (E) {
    E[E["x"] = 0] = "x";
})(E || (E = {}));
var a;
extractIndexer({
    [a]: ""
}); // Should return string
extractIndexer({
    [E.x]: ""
}); // Should return string
extractIndexer({
    ["" || 0]: ""
}); // Should return any (widened form of undefined)
