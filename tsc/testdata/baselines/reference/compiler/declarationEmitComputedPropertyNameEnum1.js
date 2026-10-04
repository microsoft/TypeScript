//// [tests/cases/compiler/declarationEmitComputedPropertyNameEnum1.ts] ////

//// [type.ts]
export enum Enum {
  A = "a",
  B = "b"
}

export type Type = { x?: { [Enum.A]: 0 } };

//// [index.ts]
import { type Type } from "./type";

export const foo = { ...({} as Type) };




//// [type.d.ts]
export declare enum Enum {
    A = "a",
    B = "b"
}
export type Type = {
    x?: {
        [Enum.A]: 0;
    };
};
//// [index.d.ts]
export declare const foo: {
    x?: {
        a: 0;
    };
};
