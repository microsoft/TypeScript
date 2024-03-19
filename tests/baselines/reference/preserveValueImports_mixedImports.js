//// [tests/cases/conformance/externalModules/typeOnly/preserveValueImports_mixedImports.ts] ////

//// [exports.ts]
export function Component() {}
export interface ComponentProps {}

//// [index.ts]
import { Component, ComponentProps } from "./exports.js";

//// [index.fixed.ts]
import { Component, type ComponentProps } from "./exports.js";


//// [exports.js]
export function Component() { }
//// [index.js]
export {};
//// [index.fixed.js]
export {};
