//// [tests/cases/compiler/betterErrorForAccidentalCallLineSeparator.ts] ////

//// [betterErrorForAccidentalCallLineSeparator.ts]
declare function foo(): string;

const a = (x: number) => x (1);

foo() (1 as number).toString();


//// [betterErrorForAccidentalCallLineSeparator.js]
"use strict";
const a = (x) => x(1);
foo()(1).toString();
