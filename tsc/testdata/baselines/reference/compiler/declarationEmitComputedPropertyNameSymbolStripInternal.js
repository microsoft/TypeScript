//// [tests/cases/compiler/declarationEmitComputedPropertyNameSymbolStripInternal.ts] ////

//// [type.ts]
namespace Foo {
    export const sym = Symbol();
}
/** @internal */
export type Type = { x?: { [Foo.sym]: 0 } };

//// [index.ts]
import { type Type } from "./type";

export const foo = { ...({} as Type) };




//// [type.d.ts]
declare namespace Foo {
    const sym: unique symbol;
}
export {};
