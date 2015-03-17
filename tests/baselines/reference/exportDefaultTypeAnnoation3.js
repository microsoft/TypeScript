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
var d = require("mod");
var s = d; // Error
//// [reference2.js]
var _mod = require("mod");
var s = _mod.default; // Error
