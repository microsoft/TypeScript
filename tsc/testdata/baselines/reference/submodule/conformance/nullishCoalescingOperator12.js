//// [tests/cases/conformance/expressions/nullishCoalescingOperator/nullishCoalescingOperator12.ts] ////

//// [nullishCoalescingOperator12.ts]
const obj: { arr: any[] } = { arr: [] };
for (const i of obj?.arr ?? []) { }


//// [nullishCoalescingOperator12.js]
const obj = { arr: [] };
for (const i of obj?.arr ?? []) { }
