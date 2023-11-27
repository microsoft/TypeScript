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
export declare const Baa: {
    banana: number;
};
//# sourceMappingURL=objectLiteralComputedNameNoDeclarationError.d.ts.map