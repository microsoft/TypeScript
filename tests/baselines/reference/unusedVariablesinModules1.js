//// [tests/cases/compiler/unusedVariablesinModules1.ts] ////

//// [unusedVariablesinModules1.ts]
export {};

var x: string;

export var y: string;

//// [unusedVariablesinModules1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
var x;
