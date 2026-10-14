// @module: nodenext, preserve
// @target: esnext
// @strict: true
// @declaration: true
// @noImplicitReferences: true

// @filename: node_modules/pkg/package.json
{ "type": "module", "exports": { "types": "./index.d.ts", "default": "./missing.wasm" } }

// @filename: node_modules/pkg/index.d.ts
export const value: number;

// @filename: index.mts
import source a from "pkg";
import { value } from "pkg";
const b: AbstractModuleSource = a;
const c: number = value;
export const d = import.source("pkg");
export const e = import("pkg");
export { a };
