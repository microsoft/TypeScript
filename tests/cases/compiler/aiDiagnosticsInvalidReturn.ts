// @filename: aiDiagnosticsInvalidReturn.ts
// @strict: true
// @noEmit: true
// @aiDiagnostics: true

function f(): number { return 'oops'; }
// Expect AI diagnostic with:
// - why: explanation of invalid return type
// - highConfidenceFix: false (no safe fix)
