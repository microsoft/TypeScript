//// [tests/cases/compiler/restUnion.ts] ////

//// [restUnion.ts]
var union: { a: number, c: boolean } | { a: string, b: string };

var rest1: { c: boolean } | { b: string };
var {a, ...rest1 } = union;


var undefinedUnion: { n: number } | undefined;
var rest2: {};
var {n, ...rest2 } = undefinedUnion;


var nullUnion: { n: number } | null;
var rest3: {};
var {n, ...rest3 } = nullUnion;


//// [restUnion.js]
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
var union;
var rest1;
var a = union.a, rest1 = __rest(union, ["a"]);
var undefinedUnion;
var rest2;
var n = undefinedUnion.n, rest2 = __rest(undefinedUnion, ["n"]);
var nullUnion;
var rest3;
var n = nullUnion.n, rest3 = __rest(nullUnion, ["n"]);
