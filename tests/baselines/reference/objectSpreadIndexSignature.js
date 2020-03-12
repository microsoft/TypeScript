//// [objectSpreadIndexSignature.ts]
declare let indexed1: { [n: string]: number; a: number; };
declare let indexed2: { [n: string]: boolean; c: boolean; };
declare let indexed3: { [n: string]: number };
let i = { ...indexed1, b: 11 };
// only indexed has indexer, so i[101]: any
i[101];
let ii = { ...indexed1, ...indexed2 };
// both have indexer, so i[1001]: number | boolean
ii[1001];

declare const b: boolean;
indexed3 = { ...b ? indexed3 : undefined };

declare var roindex: { readonly [x:string]: number };
var writable = { ...roindex };
writable.a = 0;  // should be ok.


//// [objectSpreadIndexSignature.js]
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var i = __assign(__assign({}, indexed1), { b: 11 });
// only indexed has indexer, so i[101]: any
i[101];
var ii = __assign(__assign({}, indexed1), indexed2);
// both have indexer, so i[1001]: number | boolean
ii[1001];
indexed3 = __assign({}, b ? indexed3 : undefined);
var writable = __assign({}, roindex);
writable.a = 0; // should be ok.
