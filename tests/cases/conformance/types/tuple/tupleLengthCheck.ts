declare const a: [number, string]
declare const rest: [number, string, ...boolean[]]

const a1 = a[1]
const a2 = a[2]
const a3 = a[1000]

const a4 = rest[1]
const a5 = rest[2]
const a6 = rest[3]
const a7 = rest[1000]
