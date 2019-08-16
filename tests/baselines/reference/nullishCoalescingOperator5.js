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
var _a, _b, _c, _d;
"use strict";
// should be a syntax error
(a != null ? a : b || c);
// should be a syntax error
_a = a || b, (_a != null ? _a : c);
// should be a syntax error
(a != null ? a : b && c);
// should be a syntax error
_b = a && b, (_b != null ? _b : c);
// Valid according to spec
(a != null ? a : (b || c));
// Valid according to spec
((a != null ? a : b)) || c;
// Valid according to spec
_c = (a || b), (_c != null ? _c : c);
// Valid according to spec
a || ((b != null ? b : c));
// Valid according to spec
(a != null ? a : (b && c));
// Valid according to spec
((a != null ? a : b)) && c;
// Valid according to spec
_d = (a && b), (_d != null ? _d : c);
// Valid according to spec
a && ((b != null ? b : c));
