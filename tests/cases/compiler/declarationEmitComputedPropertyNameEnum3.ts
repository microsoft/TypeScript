// @strict: true
// @declaration: true
// @emitDeclarationOnly: true

// @filename: type.ts
export namespace Foo {
  export enum Enum {
    A = "a",
    B = "b",
  }
}
export type Type = { x?: { [Foo.Enum]: 0 } };

// @filename: index.ts
import { type Type } from "./type";

export const foo = { ...({} as Type) };
