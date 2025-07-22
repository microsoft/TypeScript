// @filename: aiDiagnosticsWhyAndFix.ts
// @strict: true
// @noEmit: true
// @aiDiagnostics: true

// This test checks that actionable, explainable errors include 'why' and 'highConfidenceFix'.

interface User { name: string; }
const user: User = {}; // Error: Property 'name' is missing

// Expect AI diagnostic with:
// - why: explanation of missing property
// - highConfidenceFix: true
// - suggestions[0].why: explanation for the fix
