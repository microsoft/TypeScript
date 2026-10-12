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

// @filename: /localDefault.ts
export * from "./default";
export * from "./other";
export default class Local {}

// @filename: /localDefaultExpression.ts
export * from "./default";
export * from "./other";
export default 1;

// @filename: /defaultType.ts
export default interface DefaultType {
    value: string;
}

// @filename: /reexportType.ts
export type * from "./defaultType";

// @filename: /main.ts
import Default, { named } from "./reexport";
import Resolved from "./resolved";
import Local from "./localDefault";
import valueDefault from "./localDefaultExpression";
import type DefaultType from "./reexportType";

new Default();
new Resolved();
new Local();
valueDefault.toFixed();
const value: DefaultType = { value: "" };
named;
