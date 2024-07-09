//// [tests/cases/conformance/ambient/ambientEnumDeclaration1.ts] ////

//// [ambientEnumDeclaration1.ts]
// In ambient enum declarations, all values specified in enum member declarations must be classified as constant enum expressions.

declare enum E {
    a = 10,
    b = 10 + 1,
    c = b,
    d = (c) + 1,
    e = 10 << 2 * 8,
}

//// [ambientEnumDeclaration1.js]
// In ambient enum declarations, all values specified in enum member declarations must be classified as constant enum expressions.
