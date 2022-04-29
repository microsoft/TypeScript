//// [nullishCoalescingOperator11.ts]
declare const f11: 1 | 0 | '' | null | undefined;

let g11 = f11 ?? f11.toFixed()




//// [nullishCoalescingOperator11.js]
"use strict";
var g11 = f11 !== null && f11 !== void 0 ? f11 : f11.toFixed();
