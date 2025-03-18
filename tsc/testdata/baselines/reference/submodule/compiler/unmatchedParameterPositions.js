//// [tests/cases/compiler/unmatchedParameterPositions.ts] ////

//// [unmatchedParameterPositions.ts]
// Repros from #40251

declare let s: (...items: never[]) => never[];
let t1: () => unknown[] = s;
let t2: (...args: []) => unknown[] = s;


//// [unmatchedParameterPositions.js]
let t1 = s;
let t2 = s;
