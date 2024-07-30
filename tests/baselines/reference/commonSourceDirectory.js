//// [tests/cases/compiler/commonSourceDirectory.ts] ////

//// [index.ts]
export const x = 0;

//// [bar.d.ts]
declare module "bar" {
    export const y = 0;
}

//// [index.ts]
/// <reference path="../types/bar.d.ts" preserve="true" />
import { x } from "foo";
import { y } from "bar";
x + y;


//// [/app/bin/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../types/bar.d.ts" preserve="true" />
var foo_1 = require("foo");
var bar_1 = require("bar");
foo_1.x + bar_1.y;
//# sourceMappingURL=../myMapRoot/index.js.map

//// [/app/bin/index.d.ts]
/// <reference path="../../types/bar.d.ts" preserve="true" />
export {};
