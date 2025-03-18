//// [tests/cases/compiler/compareTypeParameterConstrainedByLiteralToLiteral.ts] ////

//// [compareTypeParameterConstrainedByLiteralToLiteral.ts]
// Test for #26758

function foo<T extends "a" | "b">(t: T) {
    t === "a";  // Should be allowed
    t === "x";  // Should be error
}


//// [compareTypeParameterConstrainedByLiteralToLiteral.js]
function foo(t) {
    t === "a";
    t === "x";
}
