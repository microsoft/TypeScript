//// [tests/cases/compiler/enumMemberNameNonIdentifier.ts] ////

//// [enumMemberNameNonIdentifier.ts]
export const enum E {
    regular = 0,
    "hyphen-member" = 1,
    "123startsWithNumber" = 2,
    "has space" = 3,
    // Greek Capital Yot (U+037F) - valid identifier in ES2015+ but NOT in ES5
    Ϳ = 4,
}

export const a = E["hyphen-member"];
export const b = E["123startsWithNumber"];
export const c = E["has space"];
export const d = E.regular;
export const e = E.Ϳ;


//// [enumMemberNameNonIdentifier.js]
export const a = 1 /* E["hyphen-member"] */;
export const b = 2 /* E["123startsWithNumber"] */;
export const c = 3 /* E["has space"] */;
export const d = 0 /* E.regular */;
export const e = 4 /* E.Ϳ */;


//// [enumMemberNameNonIdentifier.d.ts]
export declare const enum E {
    regular = 0,
    "hyphen-member" = 1,
    "123startsWithNumber" = 2,
    "has space" = 3,
    Ϳ = 4
}
export declare const a = E["hyphen-member"];
export declare const b = E["123startsWithNumber"];
export declare const c = E["has space"];
export declare const d = E.regular;
export declare const e = E.Ϳ;
