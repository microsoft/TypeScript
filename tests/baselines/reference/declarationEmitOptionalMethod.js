//// [tests/cases/compiler/declarationEmitOptionalMethod.ts] ////

//// [declarationEmitOptionalMethod.ts]
export const Foo = (opts: {
    a?(): void,
    b?: () => void,
}): {
    c?(): void,
    d?: () => void,
} => ({  });

//// [declarationEmitOptionalMethod.js]
export const Foo = (opts) => ({});


//// [declarationEmitOptionalMethod.d.ts]
export declare const Foo: (opts: {
    a?(): void;
    b?: () => void;
}) => {
    c?(): void;
    d?: () => void;
};
