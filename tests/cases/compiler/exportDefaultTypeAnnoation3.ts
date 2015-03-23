// @target: es5
// @module: commonjs

// @fileName: mod.d.ts
declare module "mod" {
    export default : number;
}

// @fileName: reference1.ts
import d from "mod";
var s: string = d; // Error

// @fileName: reference2.ts
import { default as d } from "mod";
var s: string = d; // Error