//// [tests/cases/compiler/declarationEmitComputedPropertyNameEnum3.ts] ////

//// [type.ts]
export namespace Foo {
  export enum Enum {
    A = "a",
    B = "b",
  }
}
export type Type = { x?: { [Foo.Enum]: 0 } };

//// [index.ts]
import { type Type } from "./type";

export const foo = { ...({} as Type) };




//// [type.d.ts]
export declare namespace Foo {
    enum Enum {
        A = "a",
        B = "b"
    }
}
export type Type = {
    x?: {};
};
//// [index.d.ts]
export declare const foo: {
    x?: {};
};
