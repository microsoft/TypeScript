//// [tests/cases/compiler/declarationEmitNodeModulesIndexFile.ts] ////

//// [index.d.ts]
export interface T { v: number }
export declare function make(): T;

//// [re.ts]
export { make } from "./node_modules/index";

//// [a.ts]
import { make } from "./re";
export const v = make();


//// [re.js]
export { make } from "./node_modules/index";
//// [a.js]
import { make } from "./re";
export const v = make();


//// [re.d.ts]
export { make } from "./node_modules/index";
//// [a.d.ts]
export declare const v: import("./node_modules").T;
