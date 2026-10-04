//// [tests/cases/compiler/objectLiteralComputedNameNoDeclarationError.ts] ////

//// [objectLiteralComputedNameNoDeclarationError.ts]
const Foo = {
    BANANA: 'banana' as 'banana',
}

export const Baa = {
    [Foo.BANANA]: 1
};

//// [objectLiteralComputedNameNoDeclarationError.js]
const Foo = {
    BANANA: 'banana',
};
export const Baa = {
    [Foo.BANANA]: 1
};


//// [objectLiteralComputedNameNoDeclarationError.d.ts]
export declare const Baa: {
    banana: number;
};
