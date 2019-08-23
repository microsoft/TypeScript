// Test for #26758

function foo<T extends "a" | "b">(t: T) {
    t === "a";  // Should be allowed
    t === "x";  // Should be error
}
