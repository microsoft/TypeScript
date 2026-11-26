//// [tests/cases/compiler/declarationEmitIndexDirectoryOutsideImportingDirectory.ts] ////

//// [index.ts]
export interface T { v: number }
export function make(): T { return { v: 1 }; }

//// [lib.ts]
export const other = 1;

//// [re.ts]
export { make } from "../../shared/lib/index";

//// [a.ts]
import { make } from "./re";
export const v = make();




//// [index.d.ts]
export interface T {
    v: number;
}
export declare function make(): T;
//// [re.d.ts]
export { make } from "../../shared/lib/index";
//// [a.d.ts]
export declare const v: import("../../shared/lib/index").T;
