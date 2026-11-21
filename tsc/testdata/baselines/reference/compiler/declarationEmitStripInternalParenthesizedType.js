//// [tests/cases/compiler/declarationEmitStripInternalParenthesizedType.ts] ////

//// [declarationEmitStripInternalParenthesizedType.ts]
interface Foo {}

export type T = (
    /** @internal */
    Foo
);

export const x: (
    /** @internal */
    Foo
) = {} as any;

export type T2 = readonly (
    /** @internal */
    Foo
)[];

interface Bar {
    x: string;
}

export type T3 = (
    /** @internal */
    Bar
)["x"];

export type T4 = Bar[(
    /** @internal */
    "x"
)];


//// [declarationEmitStripInternalParenthesizedType.js]
export const x = {};


//// [declarationEmitStripInternalParenthesizedType.d.ts]
export type T = any;
export declare const x;
export type T2 = any;
interface Bar {
    x: string;
}
export type T3 = any;
export type T4 = any;
export {};


//// [DtsFileErrors]


declarationEmitStripInternalParenthesizedType.d.ts(2,22): error TS7005: Variable 'x' implicitly has an 'any' type.


==== declarationEmitStripInternalParenthesizedType.d.ts (1 errors) ====
    export type T = any;
    export declare const x;
                         ~
!!! error TS7005: Variable 'x' implicitly has an 'any' type.
    export type T2 = any;
    interface Bar {
        x: string;
    }
    export type T3 = any;
    export type T4 = any;
    export {};
    