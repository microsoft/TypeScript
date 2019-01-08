//// [tests/cases/conformance/es2019/globalThisVarDeclaration.ts] ////

//// [b.js]
var a = 10;
this.a;
this.b;

//// [actual.ts]
var b = 10;
this.a;
this.b;


//// [output.js]
var a = 10;
this.a;
this.b;
var b = 10;
this.a;
this.b;
