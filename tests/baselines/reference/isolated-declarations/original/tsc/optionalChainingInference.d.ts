//// [tests/cases/conformance/expressions/optionalChaining/optionalChainingInference.ts] ////

//// [optionalChainingInference.ts]
// https://github.com/microsoft/TypeScript/issues/34579
declare function unbox<T>(box: { value: T | undefined }): T;
declare const su: string | undefined;
declare const fnu: (() => number) | undefined;
declare const osu: { prop: string } | undefined;
declare const ofnu: { prop: () => number } | undefined;

const b1 = { value: su?.length };
const v1: number = unbox(b1);

const b2 = { value: su?.length as number | undefined };
const v2: number = unbox(b2);

const b3: { value: number | undefined } = { value: su?.length };
const v3: number = unbox(b3);

const b4 = { value: fnu?.() };
const v4: number = unbox(b4);

const b5 = { value: su?.["length"] };
const v5: number = unbox(b5);

const b6 = { value: osu?.prop.length };
const v6: number = unbox(b6);

const b7 = { value: osu?.prop["length"] };
const v7: number = unbox(b7);

const b8 = { value: ofnu?.prop() };
const v8: number = unbox(b8);



/// [Declarations] ////



//// [optionalChainingInference.d.ts]
declare function unbox<T>(box: {
    value: T | undefined;
}): T;
declare const su: string | undefined;
declare const fnu: (() => number) | undefined;
declare const osu: {
    prop: string;
} | undefined;
declare const ofnu: {
    prop: () => number;
} | undefined;
declare const b1: invalid;
declare const v1: number;
declare const b2: {
    value: number;
};
declare const v2: number;
declare const b3: {
    value: number | undefined;
};
declare const v3: number;
declare const b4: invalid;
declare const v4: number;
declare const b5: invalid;
declare const v5: number;
declare const b6: invalid;
declare const v6: number;
declare const b7: invalid;
declare const v7: number;
declare const b8: invalid;
declare const v8: number;

/// [Errors] ////

optionalChainingInference.ts(8,21): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
optionalChainingInference.ts(17,21): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
optionalChainingInference.ts(20,21): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
optionalChainingInference.ts(23,21): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
optionalChainingInference.ts(26,21): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
optionalChainingInference.ts(29,21): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== optionalChainingInference.ts (6 errors) ====
    // https://github.com/microsoft/TypeScript/issues/34579
    declare function unbox<T>(box: { value: T | undefined }): T;
    declare const su: string | undefined;
    declare const fnu: (() => number) | undefined;
    declare const osu: { prop: string } | undefined;
    declare const ofnu: { prop: () => number } | undefined;
    
    const b1 = { value: su?.length };
                        ~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const v1: number = unbox(b1);
    
    const b2 = { value: su?.length as number | undefined };
    const v2: number = unbox(b2);
    
    const b3: { value: number | undefined } = { value: su?.length };
    const v3: number = unbox(b3);
    
    const b4 = { value: fnu?.() };
                        ~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const v4: number = unbox(b4);
    
    const b5 = { value: su?.["length"] };
                        ~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const v5: number = unbox(b5);
    
    const b6 = { value: osu?.prop.length };
                        ~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const v6: number = unbox(b6);
    
    const b7 = { value: osu?.prop["length"] };
                        ~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const v7: number = unbox(b7);
    
    const b8 = { value: ofnu?.prop() };
                        ~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const v8: number = unbox(b8);
    
    