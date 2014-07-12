//// [objectLitStructuralTypeMismatch.ts]
// Shouldn't compile
var x: { a: number; } = { b: 5 };

//// [objectLitStructuralTypeMismatch.js]
var x = { b: 5 };
