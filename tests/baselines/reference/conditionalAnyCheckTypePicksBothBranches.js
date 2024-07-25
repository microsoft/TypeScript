//// [tests/cases/compiler/conditionalAnyCheckTypePicksBothBranches.ts] ////

//// [conditionalAnyCheckTypePicksBothBranches.ts]
type T = any extends number ? 1 : 0;
let x: T;
x = 1;
x = 0; // not an error

type U = [any] extends [number] ? 1 : 0;
let y: U;
y = 1;
y = 0; // error

//// [conditionalAnyCheckTypePicksBothBranches.js]
var x;
x = 1;
x = 0; // not an error
var y;
y = 1;
y = 0; // error
