//// [noModuleResolution.ts] ////
/// <reference lib="dom" />

export { x } from "./does-not-exist";
export const value: number = 1;
//// [noModuleResolution.d.ts] ////
export { x } from "./does-not-exist";
export declare const value: number;
