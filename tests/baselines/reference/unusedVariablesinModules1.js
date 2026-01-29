//// [tests/cases/compiler/unusedVariablesinModules1.ts] ////

//// [unusedVariablesinModules1.ts]
export {};

var x: string;

export var y: string;

//// [unusedVariablesinModules1.js]
var x;
export var y;
