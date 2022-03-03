//// [nullishCoalescingOperator4.ts]
declare const a1: 'literal' | undefined | null
const aa1 = a1 ?? a1.toLowerCase()
const aa2 = a1 || a1.toLocaleUpperCase()


//// [nullishCoalescingOperator4.js]
"use strict";
var aa1 = a1 !== null && a1 !== void 0 ? a1 : a1.toLowerCase();
var aa2 = a1 || a1.toLocaleUpperCase();
