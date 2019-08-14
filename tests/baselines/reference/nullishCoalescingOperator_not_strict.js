//// [nullishCoalescingOperator_not_strict.ts]
declare const a1: 'literal' | undefined | null
declare const a2: '' | undefined | null
declare const a3: 1 | undefined | null
declare const a4: 0 | undefined | null
declare const a5: true | undefined | null
declare const a6: false | undefined | null
declare const a7: unknown | null
declare const a8: never | null
declare const a9: any | null


const aa1 = a1 ?? 'whatever'
const aa2 = a2 ?? 'whatever'
const aa3 = a3 ?? 'whatever'
const aa4 = a4 ?? 'whatever'
const aa5 = a5 ?? 'whatever'
const aa6 = a6 ?? 'whatever'
const aa7 = a7 ?? 'whatever'
const aa8 = a8 ?? 'whatever'
const aa9 = a9 ?? 'whatever'

//// [nullishCoalescingOperator_not_strict.js]
var aa1 = typeof a1 !== "undefined" && a1 !== null ? a1 : 'whatever';
var aa2 = typeof a2 !== "undefined" && a2 !== null ? a2 : 'whatever';
var aa3 = typeof a3 !== "undefined" && a3 !== null ? a3 : 'whatever';
var aa4 = typeof a4 !== "undefined" && a4 !== null ? a4 : 'whatever';
var aa5 = typeof a5 !== "undefined" && a5 !== null ? a5 : 'whatever';
var aa6 = typeof a6 !== "undefined" && a6 !== null ? a6 : 'whatever';
var aa7 = typeof a7 !== "undefined" && a7 !== null ? a7 : 'whatever';
var aa8 = typeof a8 !== "undefined" && a8 !== null ? a8 : 'whatever';
var aa9 = typeof a9 !== "undefined" && a9 !== null ? a9 : 'whatever';
