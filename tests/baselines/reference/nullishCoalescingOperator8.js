//// [tests/cases/conformance/expressions/nullishCoalescingOperator/nullishCoalescingOperator8.ts] ////

//// [nullishCoalescingOperator8.ts]
declare const a: { p: string | undefined, m(): string | undefined };
declare const b: { p: string | undefined, m(): string | undefined };

const n1 = a.p ?? "default";
const n2 = a.m() ?? "default";
const n3 = a.m() ?? b.p ?? b.m() ?? "default";;


//// [nullishCoalescingOperator8.js]
"use strict";
var _a, _b, _c, _d, _e;
var n1 = (_a = a.p) !== null && _a !== void 0 ? _a : "default";
var n2 = (_b = a.m()) !== null && _b !== void 0 ? _b : "default";
var n3 = (_e = (_d = (_c = a.m()) !== null && _c !== void 0 ? _c : b.p) !== null && _d !== void 0 ? _d : b.m()) !== null && _e !== void 0 ? _e : "default";
;
