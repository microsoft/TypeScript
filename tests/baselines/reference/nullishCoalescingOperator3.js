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
var _a, _b, _c, _d, _e;
var aa1 = (_e = (_d = (_c = (_b = (_a = a1 !== null && a1 !== void 0 ? a1 : a2) !== null && _a !== void 0 ? _a : a3) !== null && _b !== void 0 ? _b : a4) !== null && _c !== void 0 ? _c : a5) !== null && _d !== void 0 ? _d : a6) !== null && _e !== void 0 ? _e : 'whatever';
