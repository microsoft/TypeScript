//// [tests/cases/compiler/objectLiteralComputedNameNoDeclarationError.ts] ////

//// [objectLiteralComputedNameNoDeclarationError.ts]
const Foo = {
    BANANA: 'banana' as 'banana',
}

export const Baa = {
    [Foo.BANANA]: 1
};

/// [Declarations] ////



//// [objectLiteralComputedNameNoDeclarationError.d.ts]
declare const Foo: {
    BANANA: "banana";
};
export declare const Baa: {
    [Foo.BANANA]: number;
};
export {};
//# sourceMappingURL=objectLiteralComputedNameNoDeclarationError.d.ts.map