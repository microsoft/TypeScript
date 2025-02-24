// @strict: true
// @declaration: true
// @emitDeclarationOnly: true
// @rewriteRelativeImportExtensions: true

// @filename: a.ts
import { object } from "./obj.ts";

export const _ = object;

///////////
/**
 * huh
 */
// @filename: obj.d.ts
export declare const object: import("./id.ts").Id<{
    foo: import("./id.ts" ).Id<{}>;
}>;

// @filename: id.d.ts
export type Id<T> = T;
