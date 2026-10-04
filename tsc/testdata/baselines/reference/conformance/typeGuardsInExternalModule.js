//// [tests/cases/conformance/expressions/typeGuards/typeGuardsInExternalModule.ts] ////

//// [typeGuardsInExternalModule.ts]
// Note that type guards affect types of variables and parameters only and 
// have no effect on members of objects such as properties. 

// local variable in external module
var num: number;
var var1: string | number;
if (typeof var1 === "string") {
    num = var1.length; // string
}
else {
    num = var1; // number
}

// exported variable in external module
var strOrNum: string | number;
export var var2: string | number;
if (typeof var2 === "string") {
    // export makes the var property and not variable
    strOrNum = var2; // string | number
}
else {
    strOrNum = var2; // number | string
}

//// [typeGuardsInExternalModule.js]
"use strict";
// Note that type guards affect types of variables and parameters only and 
// have no effect on members of objects such as properties. 
Object.defineProperty(exports, "__esModule", { value: true });
exports.var2 = void 0;
// local variable in external module
var num;
var var1;
if (typeof var1 === "string") {
    num = var1.length; // string
}
else {
    num = var1; // number
}
// exported variable in external module
var strOrNum;
if (typeof exports.var2 === "string") {
    // export makes the var property and not variable
    strOrNum = exports.var2; // string | number
}
else {
    strOrNum = exports.var2; // number | string
}
