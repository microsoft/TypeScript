//// [tests/cases/compiler/accidentalCallWithLineSeparator.ts] ////

//// [accidentalCallWithLineSeparator.ts]
declare function foo(): string;

foo() (1 as number).toString();

foo() (1 as number).toString();


//// [accidentalCallWithLineSeparator.js]
"use strict";
foo()(1).toString();
foo()(1).toString();
