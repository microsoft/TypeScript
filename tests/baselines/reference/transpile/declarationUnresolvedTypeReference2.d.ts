//// [globals.ts] ////
type MissingGlobalType = "global";
declare const missingGlobalValue: "A";
//// [index.ts] ////
// this test assumes there is some global definitions for MissingGlobalType and missingGlobalValue that are not available to transpileDeclaration
export const fn = (a: MissingGlobalType): MissingGlobalType => null!;
export const fn2 = (a: MissingGlobalType) => null! as MissingGlobalType;

export const fn3 = (a: typeof missingGlobalValue): typeof missingGlobalValue => null!;
export const fn4 = (a: typeof missingGlobalValue) => null! as typeof missingGlobalValue;

//// [globals.d.ts] ////
type MissingGlobalType = "global";
declare const missingGlobalValue: "A";
//// [index.d.ts] ////
export declare const fn: (a: MissingGlobalType) => MissingGlobalType;
export declare const fn2: (a: MissingGlobalType) => MissingGlobalType;
export declare const fn3: (a: typeof missingGlobalValue) => typeof missingGlobalValue;
export declare const fn4: (a: typeof missingGlobalValue) => typeof missingGlobalValue;
