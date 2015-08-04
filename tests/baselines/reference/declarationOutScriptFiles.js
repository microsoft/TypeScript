//// [tests/cases/compiler/declarationOutScriptFiles.ts] ////

//// [fileA.ts]

var A = 0;

//// [fileB.ts]
var B = 0;

//// [fileC.ts]
var C = 0;



//// [fileA.js]
var A = 0;
//// [fileB.js]
var B = 0;
//// [fileC.js]
var C = 0;


//// [declaration.out.d.ts]
declare var A: number;
declare var B: number;
declare var C: number;
