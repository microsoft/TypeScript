//// [tests/cases/compiler/declarationQuotedMembers.ts] ////

//// [declarationQuotedMembers.ts]
export declare const mapped: { [K in 'a-b-c']: number }
export const example = mapped;

//// [declarationQuotedMembers.js]
export const example = mapped;


//// [declarationQuotedMembers.d.ts]
export declare const mapped: {
    [K in 'a-b-c']: number;
};
export declare const example: {
    "a-b-c": number;
};
