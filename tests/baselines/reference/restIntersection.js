//// [restIntersection.ts]
var intersection: { x: number, y: number } & { w: string, z: string };

var rest1: { y: number, w: string, z: string };
var {x, ...rest1 } = intersection;


//// [restIntersection.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var intersection;
var rest1;
var x = intersection.x, rest1 = __rest(intersection, ["x"]);
