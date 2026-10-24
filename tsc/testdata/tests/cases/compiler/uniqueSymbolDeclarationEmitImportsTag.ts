// @declaration: true
// @strict: true
// @module: nodenext
// @moduleResolution: nodenext

// https://github.com/microsoft/TypeScript/issues/64812

// @filename: /brand.ts
export declare const tag: unique symbol;
export type Branded<Type, Name extends string> = Type & { readonly [tag]: Name };

// @filename: /otherBrand.ts
export declare const tag: unique symbol;
export type OtherBranded = { readonly [tag]: "Other" };

// @filename: /index.ts
import type { Branded } from "./brand.js";
import type { OtherBranded } from "./otherBrand.js";

declare const user: Branded<{ name: string }, "User"> & OtherBranded;
const tag = "local";

export const copy = { ...user };
