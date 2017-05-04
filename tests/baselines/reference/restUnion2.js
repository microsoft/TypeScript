//// [restUnion2.ts]
declare const undefinedUnion: { n: number } | undefined;
var rest2: { n: number };
var {...rest2 } = undefinedUnion;


declare const nullUnion: { n: number } | null;
var rest3: { n: number };
var {...rest3 } = nullUnion;


declare const nullAndUndefinedUnion: null | undefined;
var rest4: { };
var {...rest4 } = nullAndUndefinedUnion;

declare const unionWithIntersection: ({ n: number } & { s: string }) & undefined | null;
var rest5: { n: number, s: string };
var {...rest5 } = unionWithIntersection;

//// [restUnion2.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var rest2;
var rest2 = __rest(undefinedUnion, []);
var rest3;
var rest3 = __rest(nullUnion, []);
var rest4;
var rest4 = __rest(nullAndUndefinedUnion, []);
var rest5;
var rest5 = __rest(unionWithIntersection, []);
