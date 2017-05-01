/// <reference path="fourslash.ts" />

//// [|import ns = require("ambient-module");
//// var x = v1/*0*/ + 5;|]

// @Filename: ambientModule.ts
//// declare module "ambient-module" {
////    export function f1();
////    export var v1;
//// }

verify.importFixAtPosition([
`import ns = require("ambient-module");
var x = ns.v1 + 5;`,
`import ns = require("ambient-module");
import { v1 } from "ambient-module";
var x = v1 + 5;`,
]);
