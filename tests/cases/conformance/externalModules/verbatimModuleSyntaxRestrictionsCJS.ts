// @verbatimModuleSyntax: true
// @target: esnext
// @module: commonjs
// @moduleResolution: node
// @esModuleInterop: true

// @Filename: /decl.d.ts
declare function esmy(): void;
export default esmy;
export declare function funciton(): void;

// @Filename: /ambient.d.ts
declare module "ambient" {
    const _default: number;
    export default _default;
}

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
export type { T }; // ok
export namespace JustTypes {
    export type T = number;
}
export namespace Values { // error
    export const x = 1;
}
export default interface Default {} // sketchy, but ok

// @Filename: /main2.ts
export interface I {}
export = { x: 1 };

// @Filename: /main3.ts
namespace ns {
    export const x = 1;
    export interface I {}
}
export = ns;

// @Filename: /main4.ts
export default 1; // error

// @Filename: /main5.ts
export default class C {} // error

// @Filename: /main6.ts
interface I {}
export default I; // error

// @Filename: /main7.ts
import type esmy from "./decl";
export default esmy; // error
