//// [tests/cases/conformance/types/spread/objectSpreadIndexSignature.ts] ////

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
let i = Object.assign(Object.assign({}, indexed1), { b: 11 });
// only indexed has indexer, so i[101]: any
i[101];
let ii = Object.assign(Object.assign({}, indexed1), indexed2);
// both have indexer, so i[1001]: number | boolean
ii[1001];
indexed3 = Object.assign({}, b ? indexed3 : undefined);
var writable = Object.assign({}, roindex);
writable.a = 0; // should be ok.
