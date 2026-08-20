// @target: es5, es2015
// @module: system

// @filename: modules.d.ts
declare module "a" {
    var a: number;
    export = a;  // OK, in ambient context
}

// @filename: b.ts
import * as a from "a";
