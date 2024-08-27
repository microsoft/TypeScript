// @declaration:true
// @emitDeclarationOnly: true

// @fileName: globals.ts
type MissingGlobalType = "global";
declare const missingGlobalValue: "A";
// @fileName: index.ts
// this test assumes there is some global definitions for MissingGlobalType and missingGlobalValue that are not available to transpileDeclaration
export const fn = (a: MissingGlobalType): MissingGlobalType => null!;
export const fn2 = (a: MissingGlobalType) => null! as MissingGlobalType;

export const fn3 = (a: typeof missingGlobalValue): typeof missingGlobalValue => null!;
export const fn4 = (a: typeof missingGlobalValue) => null! as typeof missingGlobalValue;

