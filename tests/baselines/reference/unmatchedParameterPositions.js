//// [unmatchedParameterPositions.ts]
// Repros from #40251

declare let s: (...items: never[]) => never[];
let t1: () => unknown[] = s;
let t2: (...args: []) => unknown[] = s;


//// [unmatchedParameterPositions.js]
"use strict";
// Repros from #40251
var t1 = s;
var t2 = s;
