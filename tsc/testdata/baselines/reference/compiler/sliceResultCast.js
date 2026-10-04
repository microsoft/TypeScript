//// [tests/cases/compiler/sliceResultCast.ts] ////

//// [sliceResultCast.ts]
declare var x: [number, string] | [number, string, string];

x.slice(1) as readonly string[];

//// [sliceResultCast.js]
"use strict";
x.slice(1);
