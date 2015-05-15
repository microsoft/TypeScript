// @target: es6

// @filename: modules.d.ts
declare module "a" {
    var a: number;
    export = a;  // OK, in ambient context
}

// @filename: b.ts
import * as a from "a";
