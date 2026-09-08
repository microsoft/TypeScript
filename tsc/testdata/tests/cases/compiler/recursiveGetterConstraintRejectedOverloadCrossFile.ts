// @strict: true
// @module: nodenext
// @noEmit: true

// https://github.com/microsoft/TypeScript/pull/64172#issuecomment-5591499161

// @filename: lib.d.ts
export interface Schema<O> { readonly out: O; }
export type Shape = Record<string, Schema<any>>;
export declare function object<S extends Shape>(shape: S, mode: "strict"): Schema<{ [K in keyof S]: S[K]["out"] }> & { shape: S };
export declare function object(shape: object, mode: "loose"): { out: unknown; shape: object };

// @filename: app.ts
import { object } from "./lib.js";

export const tree = object({
    get bad() { return [tree]; },
}, "loose");
