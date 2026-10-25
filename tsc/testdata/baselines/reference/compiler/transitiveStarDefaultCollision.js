//// [tests/cases/compiler/transitiveStarDefaultCollision.ts] ////

//// [first.ts]
export default 1;

//// [second.ts]
export default 2;

//// [nested.ts]
export * from "./first";

//// [barrel.ts]
export * from "./nested";
export * from "./second";


//// [first.js]
export default 1;
//// [second.js]
export default 2;
//// [nested.js]
export * from "./first";
//// [barrel.js]
export * from "./nested";
export * from "./second";
