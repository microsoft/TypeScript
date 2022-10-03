//// [semicolonsInModuleDeclarations.ts]
declare module ambiModule {
   export interface i1 { };
   export interface i2 { }
}

var n1: ambiModule.i1;
var n2: ambiModule.i2;


//// [semicolonsInModuleDeclarations.js]
var n1;
var n2;
