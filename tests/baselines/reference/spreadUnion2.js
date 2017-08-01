//// [spreadUnion2.ts]
declare const undefinedUnion: { a: number } | undefined;
declare const nullUnion: { b: number } | null;
declare const nullAndUndefinedUnion: null | undefined;

var o1: {} | { a: number };
var o1 = { ...undefinedUnion };

var o2: {} | { b: number };
var o2 = { ...nullUnion };

var o3: {} | { b: number } | { a: number } | { a: number, b: number };
var o3 = { ...undefinedUnion, ...nullUnion };
var o3 = { ...nullUnion, ...undefinedUnion };

var o4: {} | { a: number };
var o4 = { ...undefinedUnion, ...undefinedUnion };

var o5: {} | { b: number };
var o5 = { ...nullUnion, ...nullUnion };

var o6 = { ...nullAndUndefinedUnion, ...nullAndUndefinedUnion };
var o7 = { ...nullAndUndefinedUnion };


//// [spreadUnion2.js]
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var o1;
var o1 = __assign({}, undefinedUnion);
var o2;
var o2 = __assign({}, nullUnion);
var o3;
var o3 = __assign({}, undefinedUnion, nullUnion);
var o3 = __assign({}, nullUnion, undefinedUnion);
var o4;
var o4 = __assign({}, undefinedUnion, undefinedUnion);
var o5;
var o5 = __assign({}, nullUnion, nullUnion);
var o6 = __assign({}, nullAndUndefinedUnion, nullAndUndefinedUnion);
var o7 = __assign({}, nullAndUndefinedUnion);
