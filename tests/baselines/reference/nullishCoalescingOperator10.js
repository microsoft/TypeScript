//// [tests/cases/conformance/expressions/nullishCoalescingOperator/nullishCoalescingOperator10.ts] ////

//// [nullishCoalescingOperator10.ts]
declare function f(): string | undefined;

let gg = f() ?? 'foo'



//// [nullishCoalescingOperator10.js]
"use strict";
let gg = f() ?? 'foo';
