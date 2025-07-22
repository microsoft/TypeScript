// @filename: aiDiagnosticsArgCount.ts
// @strict: true
// @noEmit: true
// @aiDiagnostics: true

function greet(name: string) { return 'Hello ' + name; }
greet(); // Too few arguments
// Expect AI diagnostic with:
// - why: explanation of argument count mismatch
// - highConfidenceFix: false (no safe fix)
