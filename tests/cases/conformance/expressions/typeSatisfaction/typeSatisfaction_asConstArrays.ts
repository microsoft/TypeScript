// @strict: true
// @noEmit: true

// with readonly array
const arr1 = [1, 2, 3] as const satisfies readonly unknown[]

// with mutable array
const arr2 = [1, 2, 3] as const satisfies unknown[]
