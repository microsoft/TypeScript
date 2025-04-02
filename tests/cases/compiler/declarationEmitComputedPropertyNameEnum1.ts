// @strict: true
// @declaration: true
// @emitDeclarationOnly: true

// @filename: type.ts
export enum Enum {
  A = "a",
  B = "b"
}

export type Type = { x?: { [Enum.A]: 0 } };

// @filename: index.ts
import { type Type } from "./type";

export const foo = { ...({} as Type) };
