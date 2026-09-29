//// [noModuleResolution.ts] ////
/// <reference lib="dom" />

export { x } from "./does-not-exist";
export const value: number = 1;
//// [noModuleResolution.js] ////
/// <reference lib="dom" />
export { x } from "./does-not-exist";
export const value = 1;
