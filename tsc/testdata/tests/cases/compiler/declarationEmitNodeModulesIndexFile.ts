// @declaration: true
// @noImplicitReferences: true

// The type of "v" comes from "/node_modules/index.d.ts", a file directly in
// "node_modules" and not in a package directory. Declaration emit names it
// with a relative specifier.

// @filename: /node_modules/index.d.ts
export interface T { v: number }
export declare function make(): T;

// @filename: /re.ts
export { make } from "./node_modules/index";

// @filename: /a.ts
import { make } from "./re";
export const v = make();
