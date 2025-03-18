//// [tests/cases/conformance/expressions/nullishCoalescingOperator/nullishCoalescingOperator4.ts] ////

//// [nullishCoalescingOperator4.ts]
declare const a1: 'literal' | undefined | null
const aa1 = a1 ?? a1.toLowerCase()
const aa2 = a1 || a1.toLocaleUpperCase()


//// [nullishCoalescingOperator4.js]
const aa1 = a1 ?? a1.toLowerCase();
const aa2 = a1 || a1.toLocaleUpperCase();
