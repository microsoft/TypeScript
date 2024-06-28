// @declaration: true
// @target: es2015
// @emitDeclarationOnly: true

// @fileName: v1.ts
export const v1 = (...a: [n: "n", a: "a"]): {
    /** r rest param */
    a: typeof a,
} => {
    return null!
}

// @fileName: v2.ts
const n = Symbol();
export const v2 = (...a: [n: "n", a: "a"]): {
    /** r rest param */
    a: typeof a,
    /** module var */
    n: typeof n,
} => {
    return null!
}