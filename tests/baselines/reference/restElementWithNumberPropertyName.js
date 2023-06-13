//// [tests/cases/compiler/restElementWithNumberPropertyName.ts] ////

//// [restElementWithNumberPropertyName.ts]
const { 0: a, ...b } = [0, 1, 2];


//// [restElementWithNumberPropertyName.js]
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
var _a = [0, 1, 2], a = _a[0], b = __rest(_a, ["0"]);
