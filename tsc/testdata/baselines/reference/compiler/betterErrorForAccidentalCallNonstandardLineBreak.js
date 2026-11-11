//// [tests/cases/compiler/betterErrorForAccidentalCallNonstandardLineBreak.ts] ////

//// [betterErrorForAccidentalCallNonstandardLineBreak.ts]
// Repro from #65433 with U+2028 (Line Separator)
const a = (x: number) => x (1);

// With U+2029 (Paragraph Separator)
const b = (x: number) => x (1);

declare function foo(): string;

foo() (1 as number).toString();

foo() (1 as number).toString();

foo()    (1 + 2).toString();

foo() // comment (1 as number).toString();


//// [betterErrorForAccidentalCallNonstandardLineBreak.js]
"use strict";
// Repro from #65433 with U+2028 (Line Separator)
const a = (x) => x(1);
// With U+2029 (Paragraph Separator)
const b = (x) => x(1);
foo()(1).toString();
foo()(1).toString();
foo()(1 + 2).toString();
foo() // comment
(1).toString();
