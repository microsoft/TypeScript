// @declaration:true
// @emitDeclarationOnly: true
import { type Type } from "./a";

export const foo = (_: Type): void => {};
export const bar = (_: import("./a").Type): void => {};