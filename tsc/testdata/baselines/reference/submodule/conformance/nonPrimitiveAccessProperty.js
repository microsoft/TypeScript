//// [tests/cases/conformance/types/nonPrimitive/nonPrimitiveAccessProperty.ts] ////

//// [nonPrimitiveAccessProperty.ts]
var a: object;
a.toString();
a.nonExist(); // error

var { destructuring } = a; // error
var { ...rest } = a; // ok


//// [nonPrimitiveAccessProperty.js]
var a;
a.toString();
a.nonExist();
var { destructuring } = a;
var { ...rest } = a;
