//// [tests/cases/compiler/typeOnlyStarDefaultCollision.ts] ////

//// [first.ts]
export default 1;

//// [second.ts]
export default 2;

//// [barrel.ts]
export type * from "./first";
export type * from "./second";


//// [first.js]
export default 1;
//// [second.js]
export default 2;
//// [barrel.js]
export {};
