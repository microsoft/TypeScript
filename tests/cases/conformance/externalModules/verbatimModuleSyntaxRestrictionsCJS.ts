// @verbatimModuleSyntax: true
// @target: esnext
// @module: commonjs
// @moduleResolution: node
// @esModuleInterop: true

// @Filename: /decl.d.ts
declare function esmy(): void;
export default esmy;
export declare function funciton(): void;

// @Filename: /main.ts
import esmy from "./decl"; // error
import * as esmy2 from "./decl"; // error
import { funciton } from "./decl"; // error
import type { funciton as funciton2 } from "./decl"; // ok I guess?
import("./decl"); // error
type T = typeof import("./decl"); // ok
export {}; // error
export const x = 1; // error
export interface I {} // ok
