//// [tests/cases/compiler/declarationEmitComputedPropertyNameSymbol2.ts] ////

//// [type.ts]
namespace Foo {
  export const sym = Symbol();
}
export type Type = { x?: { [Foo.sym]: 0 } };

//// [index.ts]
import { type Type } from "./type";

export const foo = { ...({} as Type) };




//// [type.d.ts]
declare namespace Foo {
    const sym: unique symbol;
}
export type Type = {
    x?: {
        [Foo.sym]: 0;
    };
};
export {};
