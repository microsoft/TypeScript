//// [tests/cases/compiler/declarationEmitComputedPropertyNameSymbol1.ts] ////

//// [type.ts]
export namespace Foo {
  export const sym = Symbol();
}
export type Type = { x?: { [Foo.sym]: 0 } };

//// [index.ts]
import { type Type } from "./type";

export const foo = { ...({} as Type) };




//// [type.d.ts]
export declare namespace Foo {
    const sym: unique symbol;
}
export type Type = {
    x?: {
        [Foo.sym]: 0;
    };
};
//// [index.d.ts]
export declare const foo: {
    x?: {
        [Foo.sym]: 0;
    };
};


//// [DtsFileErrors]


index.d.ts(3,9): error TS1170: A computed property name in a type literal must refer to an expression whose type is a literal type or a 'unique symbol' type.
index.d.ts(3,10): error TS2552: Cannot find name 'Foo'. Did you mean 'foo'?


==== type.d.ts (0 errors) ====
    export declare namespace Foo {
        const sym: unique symbol;
    }
    export type Type = {
        x?: {
            [Foo.sym]: 0;
        };
    };
    
==== index.d.ts (2 errors) ====
    export declare const foo: {
        x?: {
            [Foo.sym]: 0;
            ~~~~~~~~~
!!! error TS1170: A computed property name in a type literal must refer to an expression whose type is a literal type or a 'unique symbol' type.
             ~~~
!!! error TS2552: Cannot find name 'Foo'. Did you mean 'foo'?
        };
    };
    