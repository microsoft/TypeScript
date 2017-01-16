//// [nonPrimitiveAccessProperty.ts]
var a: object;
a.toString();
a.nonExist(); // error


//// [nonPrimitiveAccessProperty.js]
var a;
a.toString();
a.nonExist(); // error
