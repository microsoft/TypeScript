//// [templateStringInTypeOf.ts]
var x = typeof `abc${ 123 }def`;

//// [templateStringInTypeOf.js]
var x = typeof ("abc" + 123 + "def");
