//// [tests/cases/compiler/bigintAmbientMinimal.ts] ////

//// [bigintAmbientMinimal.ts]
// Minimal repro from issue
declare const n = 123n;

// Non-ambient for comparison
const regular = 456n;

//// [bigintAmbientMinimal.js]
// Non-ambient for comparison
var regular = 456n;
