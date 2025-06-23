//// [tests/cases/compiler/importTypeTrailingComma.ts] ////

//// [importTypeTrailingComma.ts]
// Test that trailing commas are allowed in import type attributes
// This should work consistently with dynamic imports

// Trailing comma inside with object (already worked)
type A = import("./nonexistent", { with: { type: "json", } })

// Trailing comma after with object (this is the fix)
type B = import("./nonexistent", { with: { type: "json" }, })

// No trailing comma for comparison
type C = import("./nonexistent", { with: { type: "json" } })

// Assert syntax with trailing comma  
type D = import("./nonexistent", { assert: { type: "json" }, })

// typeof with trailing comma
type E = typeof import("./nonexistent", { with: { type: "json" }, })

// Multiple properties in with object with trailing comma after
type F = import("./nonexistent", { with: { type: "json", "resolution-mode": "import" }, })

//// [importTypeTrailingComma.js]
// Test that trailing commas are allowed in import type attributes
// This should work consistently with dynamic imports
