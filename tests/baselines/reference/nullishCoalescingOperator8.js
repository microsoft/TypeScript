//// [nullishCoalescingOperator8.ts]
declare const a: { p: string | undefined, m(): string | undefined };
declare const b: { p: string | undefined, m(): string | undefined };

const n1 = a.p ?? "default";
const n2 = a.m() ?? "default";
const n3 = a.m() ?? b.p ?? b.m() ?? "default";;


//// [nullishCoalescingOperator8.js]
var _a, _b, _c, _d, _e;
"use strict";
var n1 = (_a = a.p, (_a != null ? _a : "default"));
var n2 = (_b = a.m(), (_b != null ? _b : "default"));
var n3 = (_e = (_d = (_c = a.m(), (_c != null ? _c : b.p)), (_d != null ? _d : b.m())), (_e != null ? _e : "default"));
;
