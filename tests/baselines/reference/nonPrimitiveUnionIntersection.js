//// [nonPrimitiveUnionIntersection.ts]
var a: object & string = ""; // error
var b: object | string = ""; // ok
a = b; // error
b = a; // ok


//// [nonPrimitiveUnionIntersection.js]
var a = ""; // error
var b = ""; // ok
a = b; // error
b = a; // ok


//// [nonPrimitiveUnionIntersection.d.ts]
declare var a: object & string;
declare var b: object | string;
