// @strict: true
// @declaration: true
// @emitDeclarationOnly: true

// @filename: a.ts
import { object } from "./obj";
import { id } from "./id";
export const _ = object;
/**
*/
// @filename: obj.d.ts
import { id } from "./id";
// ----
export declare const object: id.A<{
    foo: id.A<1>
}>;

// @filename: id.d.ts
export declare namespace id {
    type A<T> = T;
}