//// [tests/cases/compiler/redefineArray.ts] ////

//// [redefineArray.ts]
Array = function (n:number, s:string) {return n;};

//// [redefineArray.js]
"use strict";
Array = function (n, s) { return n; };
