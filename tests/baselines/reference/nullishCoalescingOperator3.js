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
var aa1 = (_a = (_b = (_c = (_d = (_e = typeof a1 !== "undefined" && a1 !== null ? a1 : a2, _e !== void 0 && _e !== null ? _e : a3), _d !== void 0 && _d !== null ? _d : a4), _c !== void 0 && _c !== null ? _c : a5), _b !== void 0 && _b !== null ? _b : a6), _a !== void 0 && _a !== null ? _a : 'whatever');
