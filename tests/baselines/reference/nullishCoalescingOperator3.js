//// [tests/cases/conformance/expressions/nullishCoalescingOperator/nullishCoalescingOperator3.ts] ////

//// [nullishCoalescingOperator3.ts]
declare const a1: 'literal' | undefined | null
declare const a2: '' | undefined | null
declare const a3: 1 | undefined | null
declare const a4: 0 | undefined | null
declare const a5: true | undefined | null
declare const a6: false | undefined | null


const aa1 = a1 ?? a2 ?? a3 ?? a4 ?? a5 ?? a6 ?? 'whatever'


//// [nullishCoalescingOperator3.js]
"use strict";
const aa1 = a1 ?? a2 ?? a3 ?? a4 ?? a5 ?? a6 ?? 'whatever';
