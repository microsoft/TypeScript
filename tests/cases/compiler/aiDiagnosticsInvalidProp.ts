// @filename: aiDiagnosticsInvalidProp.ts
// @strict: true
// @noEmit: true
// @aiDiagnostics: true

const obj = { foo: 1 };
console.log(obj.bar); // Property 'bar' does not exist
// Expect AI diagnostic with:
// - why: explanation of invalid property access
// - highConfidenceFix: false (no safe fix)
