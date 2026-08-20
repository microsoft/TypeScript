//// [declarationUnresolvedGlobalReferencesNoErrors.ts] ////
export const x: MissingGlobalType = null!;
export const fn = (a: MissingGlobalType): MissingGlobalType => null!;
export const fn2 = (a: MissingGlobalType) => null! as MissingGlobalType;

export const x2: typeof missingGlobalValue = null!;
export const fn3 = (a: typeof missingGlobalValue): typeof missingGlobalValue => null!;
export const fn4 = (a: typeof missingGlobalValue) => null! as typeof missingGlobalValue;


export const o : {
    [missingGlobalValue]: string
} = null!;
//// [declarationUnresolvedGlobalReferencesNoErrors.d.ts] ////
export declare const x: MissingGlobalType;
export declare const fn: (a: MissingGlobalType) => MissingGlobalType;
export declare const fn2: (a: MissingGlobalType) => MissingGlobalType;
export declare const x2: typeof missingGlobalValue;
export declare const fn3: (a: typeof missingGlobalValue) => typeof missingGlobalValue;
export declare const fn4: (a: typeof missingGlobalValue) => typeof missingGlobalValue;
export declare const o: {
    [missingGlobalValue]: string;
};
