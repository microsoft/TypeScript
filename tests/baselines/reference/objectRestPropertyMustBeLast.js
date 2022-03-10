//// [objectRestPropertyMustBeLast.ts]
var {...a, x } = { x: 1 };    // Error, rest must be last property
({...a, x } = { x: 1 });      // Error, rest must be last property

var {...a, x, ...b } = { x: 1 };    // Error, rest must be last property
({...a, x, ...b } = { x: 1 });      // Error, rest must be last property


//// [objectRestPropertyMustBeLast.js]
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
var _a, _b;
var _c = { x: 1 }, x = _c.x; // Error, rest must be last property
(_a = { x: 1 }, x = _a.x); // Error, rest must be last property
var _d = { x: 1 }, x = _d.x, b = __rest(_d, ["a", "x"]); // Error, rest must be last property
(_b = { x: 1 }, x = _b.x, b = __rest(_b, ["x"])); // Error, rest must be last property
