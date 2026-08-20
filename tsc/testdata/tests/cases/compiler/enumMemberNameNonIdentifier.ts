// @declaration: true

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
