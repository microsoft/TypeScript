//// [tests/cases/compiler/declarationOutWithOutSpecified.ts] ////

//// [fileA.ts]

// Shold emit to "declatation.out.d.ts" and not "out.d.ts"
var A = 0;

//// [fileB.ts]
var B = 0;

//// [fileC.ts]
var C = 0;



//// [fileA.js]
// Shold emit to "declatation.out.d.ts" and not "out.d.ts"
var A = 0;
//// [fileB.js]
var B = 0;
//// [fileC.js]
var C = 0;


//// [declaration.out.d.ts]
declare var A: number;
declare var B: number;
declare var C: number;
