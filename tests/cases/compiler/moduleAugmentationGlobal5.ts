// @module: commonjs
// @declaration: true
// @filename: f1.d.ts
declare module "A" {
    global {
        interface Something {x}
    }
}
// @filename: f2.d.ts
declare module "B" {
    global {
        interface Something {y}
    }
}
// @filename: f3.ts
/// <reference path="f1.d.ts"/>
/// <reference path="f2.d.ts"/>
import "A";
import "B";

