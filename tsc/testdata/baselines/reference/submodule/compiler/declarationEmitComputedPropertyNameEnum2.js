//// [tests/cases/compiler/declarationEmitComputedPropertyNameEnum2.ts] ////

//// [type.ts]
export type Type = { x?: { [Enum.A]: 0 } };

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
        [Enum.A]: 0;
    };
};
