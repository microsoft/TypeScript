//// [tests/cases/compiler/declarationEmitDestructuring3.ts] ////

//// [declarationEmitDestructuring3.ts]
function bar([x, z, ...w]) { }
function foo([x, ...y] = [1, "string", true]) { }



//// [declarationEmitDestructuring3.js]
function bar([x, z, ...w]) { }
function foo([x, ...y] = [1, "string", true]) { }
