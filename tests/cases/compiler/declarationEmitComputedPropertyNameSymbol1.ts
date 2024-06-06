// @strict: true
// @declaration: true
// @emitDeclarationOnly: true

// @filename: type.ts
export namespace Foo {
  export const sym: unique symbol;
}
export type Type = { x?: { [Foo.sym]: 0 } };

// @filename: index.ts
import { type Type } from "./type";

export const foo = { ...({} as Type) };
