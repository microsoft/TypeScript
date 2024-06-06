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
export type Type = {
    x?: {};
};
//// [index.d.ts]
export declare const foo: {
    x?: {
        [Foo.sym]: 0;
    };
};
