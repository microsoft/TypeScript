//// [tests/cases/compiler/strictOptionalProperties2.ts] ////

//// [strictOptionalProperties2.ts]
// Repro from #44567

type T1 = { 0?: string | undefined } extends { 0?: string } ? true : false;  // false
type T2 = [(string | undefined)?] extends [string?] ? true : false;  // false


//// [strictOptionalProperties2.js]
