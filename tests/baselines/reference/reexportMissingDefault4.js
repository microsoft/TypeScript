//// [tests/cases/compiler/reexportMissingDefault4.ts] ////

//// [b.d.ts]
declare var b: number;
export { b };

//// [a.ts]
export { b } from "./b";
export { default } from "./b";

//// [a.js]
export { b } from "./b";
export { default } from "./b";
