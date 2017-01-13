//// [objectRestNested.ts]
let abc: { a: number, b: string, c: boolean };
var { a, ...{ b, ...rest } } = abc;
var a: number;
var b: string;
var other: { c: boolean };
({ a, ...{ b, ...other } } = abc);



//// [objectRestNested.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var abc;
var a = abc.a, _a = __rest(abc, ["a"]), b = _a.b, rest = __rest(_a, ["b"]);
var a;
var b;
var other;
(a = abc.a, abc, _b = __rest(abc, ["a"]), (b = _b.b, _b), other = __rest(_b, ["b"]));
var _b;
