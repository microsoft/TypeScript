//// [tests/cases/compiler/exportStarDefault.ts] ////

//// [default.ts]
export default class Default {}
export const named = 1;

//// [other.ts]
export default class Other {}

//// [reexport.ts]
export * from "./default";

//// [ambiguous.ts]
export * from "./default";
export * from "./other";

//// [resolved.ts]
export * from "./default";
export * from "./other";
export { default } from "./default";

//// [localDefault.ts]
export * from "./default";
export * from "./other";
export default class Local {}

//// [localDefaultExpression.ts]
export * from "./default";
export * from "./other";
export default 1;

//// [defaultType.ts]
export default interface DefaultType {
    value: string;
}

//// [reexportType.ts]
export type * from "./defaultType";

//// [main.ts]
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


//// [default.js]
export default class Default {
}
export const named = 1;
//// [other.js]
export default class Other {
}
//// [reexport.js]
export * from "./default";
//// [ambiguous.js]
export * from "./default";
export * from "./other";
//// [resolved.js]
export * from "./default";
export * from "./other";
export { default } from "./default";
//// [localDefault.js]
export * from "./default";
export * from "./other";
export default class Local {
}
//// [localDefaultExpression.js]
export * from "./default";
export * from "./other";
export default 1;
//// [defaultType.js]
export {};
//// [reexportType.js]
export {};
//// [main.js]
import Default, { named } from "./reexport";
import Resolved from "./resolved";
import Local from "./localDefault";
import valueDefault from "./localDefaultExpression";
new Default();
new Resolved();
new Local();
valueDefault.toFixed();
const value = { value: "" };
named;


//// [default.d.ts]
export default class Default {
}
export declare const named = 1;
//// [other.d.ts]
export default class Other {
}
//// [reexport.d.ts]
export * from "./default";
//// [ambiguous.d.ts]
export * from "./default";
export * from "./other";
//// [resolved.d.ts]
export * from "./default";
export * from "./other";
export { default } from "./default";
//// [localDefault.d.ts]
export * from "./default";
export * from "./other";
export default class Local {
}
//// [localDefaultExpression.d.ts]
export * from "./default";
export * from "./other";
declare const _default = 1;
export default _default;
//// [defaultType.d.ts]
export default interface DefaultType {
    value: string;
}
//// [reexportType.d.ts]
export type * from "./defaultType";
//// [main.d.ts]
export {};
