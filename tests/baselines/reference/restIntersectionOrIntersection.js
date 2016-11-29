//// [restIntersectionOrIntersection.ts]
var intersection: { x: number, y: number } & { w: string, z: string };
var union: { a: number, c: boolean } | { a: string, b: string };


var rest1: { y: number, w: string, z: string };
var {x, ...rest1 } = intersection;

var rest2: { c: boolean } | { b: string };
var {a, ...rest2 } = union;



//// [restIntersectionOrIntersection.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var intersection;
var union;
var rest1;
var x = intersection.x, rest1 = __rest(intersection, ["x"]);
var rest2;
var a = union.a, rest2 = __rest(union, ["a"]);
