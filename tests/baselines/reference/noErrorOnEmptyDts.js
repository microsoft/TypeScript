//// [tests/cases/compiler/noErrorOnEmptyDts.ts] ////

//// [test.d.ts]


// comment

//// [main.ts]
import "test"

//// [main.js]
"use strict";
require("test");
