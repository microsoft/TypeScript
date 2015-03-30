//// [tests/cases/compiler/exportDefaultTypeAnnoation3.ts] ////

//// [mod.d.ts]

declare module "mod" {
    export default : number;
}

//// [reference1.ts]
import d from "mod";
var s: string = d; // Error

//// [reference2.ts]
import { default as d } from "mod";
var s: string = d; // Error

//// [reference1.js]
var mod_1 = require("mod");
var s = mod_1.default; // Error
//// [reference2.js]
var mod_1 = require("mod");
var s = mod_1.default; // Error
