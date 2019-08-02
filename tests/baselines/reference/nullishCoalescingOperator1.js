//// [nullishCoalescingOperator1.ts]
declare const a1: string | undefined | null
declare const a2: string | undefined | null
declare const a3: string | undefined | null
declare const a4: string | undefined | null

declare const b1: number | undefined | null
declare const b2: number | undefined | null
declare const b3: number | undefined | null
declare const b4: number | undefined | null

declare const c1: boolean | undefined | null
declare const c2: boolean | undefined | null
declare const c3: boolean | undefined | null
declare const c4: boolean | undefined | null

interface I { a: string }
declare const d1: I | undefined | null
declare const d2: I | undefined | null
declare const d3: I | undefined | null
declare const d4: I | undefined | null

const aa1 = a1 ?? 'whatever';
const aa2 = a2 ?? 'whatever';
const aa3 = a3 ?? 'whatever';
const aa4 = a4 ?? 'whatever';

const bb1 = b1 ?? 1;
const bb2 = b2 ?? 1;
const bb3 = b3 ?? 1;
const bb4 = b4 ?? 1;

const cc1 = c1 ?? true;
const cc2 = c2 ?? true;
const cc3 = c3 ?? true;
const cc4 = c4 ?? true;

const dd1 = d1 ?? {b: 1};
const dd2 = d2 ?? {b: 1};
const dd3 = d3 ?? {b: 1};
const dd4 = d4 ?? {b: 1};

//// [nullishCoalescingOperator1.js]
"use strict";
var aa1 = typeof a1 !== "undefined" && a1 !== null ? a1 : 'whatever';
var aa2 = typeof a2 !== "undefined" && a2 !== null ? a2 : 'whatever';
var aa3 = typeof a3 !== "undefined" && a3 !== null ? a3 : 'whatever';
var aa4 = typeof a4 !== "undefined" && a4 !== null ? a4 : 'whatever';
var bb1 = typeof b1 !== "undefined" && b1 !== null ? b1 : 1;
var bb2 = typeof b2 !== "undefined" && b2 !== null ? b2 : 1;
var bb3 = typeof b3 !== "undefined" && b3 !== null ? b3 : 1;
var bb4 = typeof b4 !== "undefined" && b4 !== null ? b4 : 1;
var cc1 = typeof c1 !== "undefined" && c1 !== null ? c1 : true;
var cc2 = typeof c2 !== "undefined" && c2 !== null ? c2 : true;
var cc3 = typeof c3 !== "undefined" && c3 !== null ? c3 : true;
var cc4 = typeof c4 !== "undefined" && c4 !== null ? c4 : true;
var dd1 = typeof d1 !== "undefined" && d1 !== null ? d1 : { b: 1 };
var dd2 = typeof d2 !== "undefined" && d2 !== null ? d2 : { b: 1 };
var dd3 = typeof d3 !== "undefined" && d3 !== null ? d3 : { b: 1 };
var dd4 = typeof d4 !== "undefined" && d4 !== null ? d4 : { b: 1 };
