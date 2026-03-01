//// [tests/cases/compiler/invalidSplice.ts] ////

//// [invalidSplice.ts]
var arr = [].splice(0,3,4,5);

//// [invalidSplice.js]
"use strict";
var arr = [].splice(0, 3, 4, 5);
