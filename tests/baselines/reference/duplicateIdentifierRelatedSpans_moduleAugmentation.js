//// [tests/cases/compiler/duplicateIdentifierRelatedSpans_moduleAugmentation.ts] ////

//// [a.ts]
export const x = 0;

//// [b.ts]
export {};

declare module "./a" {
    export const x = 0;
}

declare module "../dir/a" {
    export const x = 0;
}


//// [a.js]
export const x = 0;
//// [b.js]
export {};
