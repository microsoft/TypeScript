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
// should be a syntax error
(typeof a !== "undefined" && a !== null ? a : b) || c;
// should be a syntax error
_a = a || b, _a !== void 0 && _a !== null ? _a : c;
// should be a syntax error
typeof a !== "undefined" && a !== null ? a : b && c;
// should be a syntax error
_b = a && b, _b !== void 0 && _b !== null ? _b : c;
// Valid according to spec
typeof a !== "undefined" && a !== null ? a : (b || c);
// Valid according to spec
(typeof a !== "undefined" && a !== null ? a : b) || c;
// Valid according to spec
_c = (a || b), _c !== void 0 && _c !== null ? _c : c;
// Valid according to spec
a || (typeof b !== "undefined" && b !== null ? b : c);
// Valid according to spec
typeof a !== "undefined" && a !== null ? a : (b && c);
// Valid according to spec
(typeof a !== "undefined" && a !== null ? a : b) && c;
// Valid according to spec
_d = (a && b), _d !== void 0 && _d !== null ? _d : c;
// Valid according to spec
a && (typeof b !== "undefined" && b !== null ? b : c);
