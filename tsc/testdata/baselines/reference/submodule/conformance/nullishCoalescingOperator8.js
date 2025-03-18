//// [tests/cases/conformance/expressions/nullishCoalescingOperator/nullishCoalescingOperator8.ts] ////

//// [nullishCoalescingOperator8.ts]
declare const a: { p: string | undefined, m(): string | undefined };
declare const b: { p: string | undefined, m(): string | undefined };

const n1 = a.p ?? "default";
const n2 = a.m() ?? "default";
const n3 = a.m() ?? b.p ?? b.m() ?? "default";;


//// [nullishCoalescingOperator8.js]
const n1 = a.p ?? "default";
const n2 = a.m() ?? "default";
const n3 = a.m() ?? b.p ?? b.m() ?? "default";
;
