//// [nullishCoalescingOperator5.ts]
declare const a: string | undefined
declare const b: string | undefined
declare const c: string | undefined

// should be a syntax error
a ?? b || c;

// should be a syntax error
a || b ?? c;

// should be a syntax error
a ?? b && c;

// should be a syntax error
a && b ?? c;

// Valid according to spec
a ?? (b || c);

// Valid according to spec
(a ?? b) || c;

// Valid according to spec
(a || b) ?? c;

// Valid according to spec
a || (b ?? c);

// Valid according to spec
a ?? (b && c);

// Valid according to spec
(a ?? b) && c;

// Valid according to spec
(a && b) ?? c;

// Valid according to spec
a && (b ?? c);


//// [nullishCoalescingOperator5.js]
"use strict";
var _a, _b, _c, _d;
// should be a syntax error
a !== null && a !== void 0 ? a : b || c;
// should be a syntax error
(_a = a || b) !== null && _a !== void 0 ? _a : c;
// should be a syntax error
a !== null && a !== void 0 ? a : b && c;
// should be a syntax error
(_b = a && b) !== null && _b !== void 0 ? _b : c;
// Valid according to spec
a !== null && a !== void 0 ? a : (b || c);
// Valid according to spec
(a !== null && a !== void 0 ? a : b) || c;
// Valid according to spec
(_c = (a || b)) !== null && _c !== void 0 ? _c : c;
// Valid according to spec
a || (b !== null && b !== void 0 ? b : c);
// Valid according to spec
a !== null && a !== void 0 ? a : (b && c);
// Valid according to spec
(a !== null && a !== void 0 ? a : b) && c;
// Valid according to spec
(_d = (a && b)) !== null && _d !== void 0 ? _d : c;
// Valid according to spec
a && (b !== null && b !== void 0 ? b : c);
