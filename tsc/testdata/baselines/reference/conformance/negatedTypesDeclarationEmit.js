//// [tests/cases/conformance/types/negated/negatedTypesDeclarationEmit.ts] ////

//// [negatedTypesDeclarationEmit.ts]
// Declaration emit round-trip for negated types.
// Each exported declaration should print its `not` type faithfully in the .d.ts.

export type NotString = not string;

export type NotUnionOfLiterals = not ("a" | "b" | "c");

export type NotObject = not { x: number };

export declare let notNumber: not number;

export declare function accept(x: not null): void;

export declare function make<T extends not undefined>(value: T): T;

export interface Holder {
    value: not boolean;
    readonly tag: string & not "reserved";
}

export type IndexNoMethod = {
    [idx: string & not "method"]: number;
};

export declare const nested: not (string | { y: not number });


//// [negatedTypesDeclarationEmit.js]
// Declaration emit round-trip for negated types.
// Each exported declaration should print its `not` type faithfully in the .d.ts.
export {};


//// [negatedTypesDeclarationEmit.d.ts]
export type NotString = not string;
export type NotUnionOfLiterals = not ("a" | "b" | "c");
export type NotObject = not {
    x: number;
};
export declare let notNumber: not number;
export declare function accept(x: not null): void;
export declare function make<T extends not undefined>(value: T): T;
export interface Holder {
    value: not boolean;
    readonly tag: string & not "reserved";
}
export type IndexNoMethod = {
    [idx: string & not "method"]: number;
};
export declare const nested: not (string | {
    y: not number;
});
