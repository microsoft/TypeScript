// @strict: true
// @declaration: true
// @emitDeclarationOnly: true

// https://github.com/microsoft/TypeScript/issues/61239

// @filename: a.ts
import { object } from "./obj";

export const _ = object;

///////////
/**
 * huh
 */
// @filename: obj.d.ts
export declare const object: import("./id").Id<{
    foo: import("./id" ).Id<{}>;
}>;

// @filename: id.d.ts
export type Id<T> = T;
