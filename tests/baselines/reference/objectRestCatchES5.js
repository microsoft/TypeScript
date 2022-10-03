//// [objectRestCatchES5.ts]
let a = 1, b = 2;
try {} catch ({ a, ...b }) {}

//// [objectRestCatchES5.js]
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
var a = 1, b = 2;
try { }
catch (_a) {
    var a_1 = _a.a, b_1 = __rest(_a, ["a"]);
}
