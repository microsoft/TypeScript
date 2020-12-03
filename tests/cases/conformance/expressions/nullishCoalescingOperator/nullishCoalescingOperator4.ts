// @strict: true

declare const a1: 'literal' | undefined | null
const aa1 = a1 ?? a1.toLowerCase()
const aa2 = a1 || a1.toLocaleUpperCase()
