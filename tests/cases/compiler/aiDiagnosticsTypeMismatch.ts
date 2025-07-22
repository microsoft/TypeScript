// @filename: aiDiagnosticsTypeMismatch.ts
// @strict: true
// @noEmit: true
// @aiDiagnostics: true

// Type mismatch: assigning number to string
let s: string = 123;
// Expect AI diagnostic with:
// - why: explanation of type mismatch
// - highConfidenceFix: false (no safe fix)
