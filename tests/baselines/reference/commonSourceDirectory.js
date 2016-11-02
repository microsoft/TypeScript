//// [tests/cases/compiler/commonSourceDirectory.ts] ////

//// [index.ts]
// Test that importing a file from `node_modules` does not affect calculation of the common source directory.

export const x = 0;

//// [index.ts]
import { x } from "foo";
x + 1;


//// [/app/bin/index.js]
"use strict";
var foo_1 = require("foo");
foo_1.x + 1;
