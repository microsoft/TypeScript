//// [compareTypeParameterConstrainedByLiteralToLiteral.ts]
// Test for #26758

function foo<T extends "a" | "b">(t: T) {
    t === "a";  // Should be allowed
    t === "x";  // Should be error
}


//// [compareTypeParameterConstrainedByLiteralToLiteral.js]
// Test for #26758
function foo(t) {
    t === "a"; // Should be allowed
    t === "x"; // Should be error
}
