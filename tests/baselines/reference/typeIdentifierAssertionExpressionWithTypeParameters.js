//// [tests/cases/compiler/typeIdentifierAssertionExpressionWithTypeParameters.ts] ////

//// [typeIdentifierAssertionExpressionWithTypeParameters.ts]
const type = <T,>(x: T) => x;

type satisfies <T>(x: T) => T;
type as <T>() => T;


//// [typeIdentifierAssertionExpressionWithTypeParameters.js]
var type = function (x) { return x; };
type;
type;
