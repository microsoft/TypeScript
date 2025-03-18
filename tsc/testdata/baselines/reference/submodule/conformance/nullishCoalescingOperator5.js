//// [tests/cases/conformance/expressions/nullishCoalescingOperator/nullishCoalescingOperator5.ts] ////

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
a ?? (b || c);
(a || b) ?? c;
a ?? (b && c);
(a && b) ?? c;
a ?? (b || c);
(a ?? b) || c;
(a || b) ?? c;
a || (b ?? c);
a ?? (b && c);
(a ?? b) && c;
(a && b) ?? c;
a && (b ?? c);
