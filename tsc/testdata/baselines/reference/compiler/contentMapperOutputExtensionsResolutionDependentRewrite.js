//// [tests/cases/compiler/contentMapperOutputExtensionsResolutionDependentRewrite.ts] ////

//// [package.json]
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

//// [root.toml]
const __VERSION = "1.0.0";
export class Root {}
export interface TypeOnly {}
export function make() { return new Root(); }

//// [suffixed.native.toml]
const __VERSION = "1.0.0";
export const suffixed = 1;

//// [blob.toml]
const __VERSION = "1.0.0";
export const allowed = 1;

//// [blob.part.toml]
const __VERSION = "1.0.0";
export const second = 1;

//// [blob.identity]
const __VERSION = "1.0.0";
export const identity = 1;

//// [declaration.d.toml.ts]
export const declaration: number;

//// [main.ts]
import { make } from "./root.toml";
import type { TypeOnly } from "./root.toml";
export { suffixed } from "./suffixed.toml";
export { allowed } from "./allowed/blob.toml";
export { second } from "./second/blob.part.toml";
export { identity } from "./blob.identity";
export { declaration } from "./declaration.toml";
export type { TypeOnly as ExportedType } from "./root.toml";
export const root = make();
export const load = () => import("./root.toml");
export type RootType = import("./root.toml").Root;
export type DirectType = TypeOnly;


//// [main.js]
import { make } from "./root.toml";
export { suffixed } from "./suffixed.toml";
export { allowed } from "./allowed/blob.js";
export { second } from "./second/blob.part.js";
export { identity } from "./blob.identity";
export { declaration } from "./declaration.js";
export const root = make();
export const load = () => import("./root.toml");


//// [root.d.ts]
export declare class Root {
}
export interface TypeOnly {
}
export declare function make(): Root;
//// [suffixed.native.d.ts]
export declare const suffixed = 1;
//// [blob.d.ts]
export declare const allowed = 1;
//// [blob.part.d.ts]
export declare const second = 1;
//// [blob.d.identity.ts]
export declare const identity = 1;
//// [main.d.ts]
import type { TypeOnly } from "./root.toml";
export { suffixed } from "./suffixed.toml";
export { allowed } from "./allowed/blob.js";
export { second } from "./second/blob.part.js";
export { identity } from "./blob.identity";
export { declaration } from "./declaration.js";
export type { TypeOnly as ExportedType } from "./root.toml";
export declare const root: import("./root.toml").Root;
export declare const load: () => Promise<typeof import("./root.toml")>;
export type RootType = import("./root.toml").Root;
export type DirectType = TypeOnly;
