// @target: es2015
//@filename: ambientExternalModuleMerging_use.ts
//@module: commonjs
import M = require("M");
// Should be strings
var x = M.x;
var y = M.y;

//@filename: ambientExternalModuleMerging_declare.ts
declare module "M" {
    export var x: string;
}

// Merge
declare module "M" {
    export var y: string;
}