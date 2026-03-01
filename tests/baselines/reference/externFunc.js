//// [tests/cases/compiler/externFunc.ts] ////

//// [externFunc.ts]
declare function parseInt(s:string):number;

parseInt("2");


//// [externFunc.js]
"use strict";
parseInt("2");
