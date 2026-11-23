//// [tests/cases/compiler/starDefaultAssignmentCollision.ts] ////

//// [first.ts]
const first = 1;
export default first;

//// [second.ts]
const second = 2;
export default second;

//// [barrel.ts]
export * from "./first";
export * from "./second";


//// [first.js]
const first = 1;
export default first;
//// [second.js]
const second = 2;
export default second;
//// [barrel.js]
export * from "./first";
export * from "./second";
