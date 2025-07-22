// @filename: aiDiagnosticsOptions.ts
// @strict: true
// @noEmit: true
// @aiDiagnostics: true
// @structuredOutput: true
// @machineReadable: true
// @aiContext: true
// @suggestionConfidence: 0.7
// @aiErrorSummary: true
// @semanticHints: true
// @patternSuggestions: true

// This file tests the AI diagnostics compiler options and output formats.

let x: string = 42; // Should trigger type error and AI diagnostics

function foo(a: number) {
    return a + 1;
}

foo("bar"); // Should trigger type error and AI diagnostics

// Intentionally missing import
console.log(missingVar); // Should trigger AI diagnostics for undefined variable

// Edge case: valid code
const ok: number = 123;
