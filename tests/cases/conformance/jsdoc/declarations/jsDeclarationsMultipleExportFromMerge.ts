// @allowJs: true
// @checkJs: true
// @target: es5
// @outDir: ./out
// @declaration: true
// @filename: items.js
export const a = 1;
export const b = 2;
export const c = 3;

// @filename: justone.js
export { a, b, c } from "./items";

// @filename: two.js
export { a } from "./items";
export { b, c } from "./items";

// @filename: multiple.js
export {a, b} from "./items";
export {a as aa} from "./two";
export {b as bb} from "./two";
export {c} from "./two"
export {c as cc} from "./items";
