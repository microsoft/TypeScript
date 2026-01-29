//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsMultipleExportFromMerge.ts] ////

//// [items.js]
export const a = 1;
export const b = 2;
export const c = 3;

//// [justone.js]
export { a, b, c } from "./items";

//// [two.js]
export { a } from "./items";
export { b, c } from "./items";

//// [multiple.js]
export {a, b} from "./items";
export {a as aa} from "./two";
export {b as bb} from "./two";
export {c} from "./two"
export {c as cc} from "./items";


//// [items.js]
export const a = 1;
export const b = 2;
export const c = 3;
//// [justone.js]
export { a, b, c } from "./items";
//// [two.js]
export { a } from "./items";
export { b, c } from "./items";
//// [multiple.js]
export { a, b } from "./items";
export { a as aa } from "./two";
export { b as bb } from "./two";
export { c } from "./two";
export { c as cc } from "./items";


//// [items.d.ts]
export const a: 1;
export const b: 2;
export const c: 3;
//// [justone.d.ts]
export { a, b, c } from "./items";
//// [two.d.ts]
export { a, b, c } from "./items";
//// [multiple.d.ts]
export { a, b, c as cc } from "./items";
export { a as aa, b as bb, c } from "./two";
