//// [tests/cases/conformance/expressions/nullishCoalescingOperator/nullishCoalescingOperator10.ts] ////

//// [nullishCoalescingOperator10.ts]
declare function f(): string | undefined;

let gg = f() ?? 'foo'



//// [nullishCoalescingOperator10.js]
var _a;
let gg = (_a = f()) !== null && _a !== void 0 ? _a : 'foo';
