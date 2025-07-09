//// [tests/cases/conformance/expressions/nullishCoalescingOperator/nullishCoalescingOperator12.ts] ////

//// [nullishCoalescingOperator12.ts]
const obj: { arr: any[] } = { arr: [] };
for (const i of obj?.arr ?? []) { }


//// [nullishCoalescingOperator12.js]
var _a;
const obj = { arr: [] };
for (const i of (_a = obj?.arr) !== null && _a !== void 0 ? _a : []) { }
