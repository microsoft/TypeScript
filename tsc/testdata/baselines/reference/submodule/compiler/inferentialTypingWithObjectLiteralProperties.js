//// [tests/cases/compiler/inferentialTypingWithObjectLiteralProperties.ts] ////

//// [inferentialTypingWithObjectLiteralProperties.ts]
function f<T>(x: T, y: T): T {
return x;
}
f({ x: [null] }, { x: [1] }).x[0] = "" // ok
f({ x: [1] }, { x: [null] }).x[0] = "" // was error TS2011: Cannot convert 'string' to 'number'.


//// [inferentialTypingWithObjectLiteralProperties.js]
function f(x, y) {
    return x;
}
f({ x: [null] }, { x: [1] }).x[0] = ""; // ok
f({ x: [1] }, { x: [null] }).x[0] = ""; // was error TS2011: Cannot convert 'string' to 'number'.
