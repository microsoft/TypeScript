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

optionalChainingInference.ts(8,21): error TS9013: Expression type can't be inferred with --isolatedDeclarations
optionalChainingInference.ts(17,21): error TS9013: Expression type can't be inferred with --isolatedDeclarations
optionalChainingInference.ts(20,21): error TS9013: Expression type can't be inferred with --isolatedDeclarations
optionalChainingInference.ts(23,21): error TS9013: Expression type can't be inferred with --isolatedDeclarations
optionalChainingInference.ts(26,21): error TS9013: Expression type can't be inferred with --isolatedDeclarations
optionalChainingInference.ts(29,21): error TS9013: Expression type can't be inferred with --isolatedDeclarations


==== optionalChainingInference.ts (6 errors) ====
    // https://github.com/microsoft/TypeScript/issues/34579
    declare function unbox<T>(box: { value: T | undefined }): T;
    declare const su: string | undefined;
    declare const fnu: (() => number) | undefined;
    declare const osu: { prop: string } | undefined;
    declare const ofnu: { prop: () => number } | undefined;
    
    const b1 = { value: su?.length };
                        ~~~~~~~~~~
!!! error TS9013: Expression type can't be inferred with --isolatedDeclarations
!!! related TS9027 optionalChainingInference.ts:8:7: Add a type annotation to the variable b1
!!! related TS9035 optionalChainingInference.ts:8:21: Add a type assertion to this expression to make type type explicit
    const v1: number = unbox(b1);
    
    const b2 = { value: su?.length as number | undefined };
    const v2: number = unbox(b2);
    
    const b3: { value: number | undefined } = { value: su?.length };
    const v3: number = unbox(b3);
    
    const b4 = { value: fnu?.() };
                        ~~~~~~~
!!! error TS9013: Expression type can't be inferred with --isolatedDeclarations
!!! related TS9027 optionalChainingInference.ts:17:7: Add a type annotation to the variable b4
!!! related TS9035 optionalChainingInference.ts:17:21: Add a type assertion to this expression to make type type explicit
    const v4: number = unbox(b4);
    
    const b5 = { value: su?.["length"] };
                        ~~~~~~~~~~~~~~
!!! error TS9013: Expression type can't be inferred with --isolatedDeclarations
!!! related TS9027 optionalChainingInference.ts:20:7: Add a type annotation to the variable b5
!!! related TS9035 optionalChainingInference.ts:20:21: Add a type assertion to this expression to make type type explicit
    const v5: number = unbox(b5);
    
    const b6 = { value: osu?.prop.length };
                        ~~~~~~~~~~~~~~~~
!!! error TS9013: Expression type can't be inferred with --isolatedDeclarations
!!! related TS9027 optionalChainingInference.ts:23:7: Add a type annotation to the variable b6
!!! related TS9035 optionalChainingInference.ts:23:21: Add a type assertion to this expression to make type type explicit
    const v6: number = unbox(b6);
    
    const b7 = { value: osu?.prop["length"] };
                        ~~~~~~~~~~~~~~~~~~~
!!! error TS9013: Expression type can't be inferred with --isolatedDeclarations
!!! related TS9027 optionalChainingInference.ts:26:7: Add a type annotation to the variable b7
!!! related TS9035 optionalChainingInference.ts:26:21: Add a type assertion to this expression to make type type explicit
    const v7: number = unbox(b7);
    
    const b8 = { value: ofnu?.prop() };
                        ~~~~~~~~~~~~
!!! error TS9013: Expression type can't be inferred with --isolatedDeclarations
!!! related TS9027 optionalChainingInference.ts:29:7: Add a type annotation to the variable b8
!!! related TS9035 optionalChainingInference.ts:29:21: Add a type assertion to this expression to make type type explicit
    const v8: number = unbox(b8);
    
    