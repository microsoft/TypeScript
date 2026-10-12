// @target: esnext
// @module: commonjs, esnext
// @declaration: true

// @filename: /default.ts
export default class Default {}
export const named = 1;

// @filename: /other.ts
export default class Other {}

// @filename: /reexport.ts
export * from "./default";

// @filename: /ambiguous.ts
export * from "./default";
export * from "./other";

// @filename: /resolved.ts
export * from "./default";
export * from "./other";
export { default } from "./default";

// @filename: /main.ts
import Default, { named } from "./reexport";
import Resolved from "./resolved";

new Default();
new Resolved();
named;
