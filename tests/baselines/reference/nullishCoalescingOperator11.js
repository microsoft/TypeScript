//// [tests/cases/conformance/expressions/nullishCoalescingOperator/nullishCoalescingOperator11.ts] ////

//// [nullishCoalescingOperator11.ts]
declare const f11: 1 | 0 | '' | null | undefined;

let g11 = f11 ?? f11.toFixed()




//// [nullishCoalescingOperator11.js]
"use strict";
let g11 = f11 ?? f11.toFixed();
