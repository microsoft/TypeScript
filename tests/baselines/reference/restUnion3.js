//// [restUnion3.ts]
declare const nullAndUndefinedUnion: null | undefined;
var rest4: { };
var {...rest4 } = nullAndUndefinedUnion;

declare const unionWithIntersection: ({ n: number } & { s: string }) & undefined;
var rest5: { n: number, s: string };
var {...rest5 } = unionWithIntersection;


//// [restUnion3.js]
"use strict";
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
var rest4;
var rest4 = __rest(nullAndUndefinedUnion, []);
var rest5;
var rest5 = __rest(unionWithIntersection, []);
