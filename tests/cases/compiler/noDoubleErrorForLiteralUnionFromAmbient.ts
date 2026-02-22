// @strict: true

// Repro from #63050
// When assigning a union of string literals from an ambient declaration to
// an incompatible type, the error should not show the same message twice.

declare const x: "a" | "b"

const y: number = x

declare const single: "hello"

const z: number = single
