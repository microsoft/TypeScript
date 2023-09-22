// @strict: true
// @noUncheckedIndexedAccess: true
// @noEmit: true

// repro from https://github.com/microsoft/TypeScript/issues/54420

declare const array1: [...number[], number]
const el1: number = array1[0]

declare const array2: [...number[], number]
const el2: number = array2[1]

declare const array3: [number, ...number[], number]
const el3: number = array3[1]

declare const array4: [number, ...number[], number]
const el4: number = array4[2]
