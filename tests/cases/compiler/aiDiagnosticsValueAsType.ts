// @filename: aiDiagnosticsValueAsType.ts
// @strict: true
// @noEmit: true
// @aiDiagnostics: true

let x = 42;
let y: x = 1; // Using value as a type
// Expect AI diagnostic with:
// - why: explanation of value used as a type
// - highConfidenceFix: false (no safe fix)
