// @target: es2015
// @strict: true
// @declaration: true
// @emitDeclarationOnly: true
// @stripInternal: true

// @filename: type.ts
namespace Foo {
    export const sym = Symbol();
}
/** @internal */
export type Type = { x?: { [Foo.sym]: 0 } };

// @filename: index.ts
import { type Type } from "./type";

export const foo = { ...({} as Type) };
