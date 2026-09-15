//// [tests/cases/compiler/outputExtension.ts] ////

//// [package.json]
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

//// [helper.ts]
export declare const helper: string;

//// [other.p]
const __VERSION = "1.0.0";
export declare const other: number;

//// [component.y.z]
const __VERSION = "1.0.0";
import { helper } from "./helper.ts";
import { other } from "./other.p";
export interface ComponentProps {
    label: typeof helper;
    count: typeof other;
}
export declare const component: ComponentProps;

//// [main.ts]
export { component } from "./component.y.z";
export type { ComponentProps } from "./component.y.z";
export type Props = import("./component.y.z").ComponentProps;
export * as other from "./other.p";
export { helper } from "./helper.ts";
export { helper as helperJs } from "./helper.js";
export { helper as helperBare } from "./helper";




//// [helper.d.ts]
export declare const helper: string;
//# sourceMappingURL=helper.d.ts.map//// [other.d.ts]
export declare const other: number;
//# sourceMappingURL=other.d.ts.map//// [component.d.ts]
import { helper } from "./helper.js";
import { other } from "./other.js";
export interface ComponentProps {
    label: typeof helper;
    count: typeof other;
}
export declare const component: ComponentProps;
//# sourceMappingURL=component.d.ts.map//// [main.d.ts]
export { component } from "./component.js";
export type { ComponentProps } from "./component.js";
export type Props = import("./component.js").ComponentProps;
export * as other from "./other.js";
export { helper } from "./helper.js";
export { helper as helperJs } from "./helper.js";
export { helper as helperBare } from "./helper";
//# sourceMappingURL=main.d.ts.map