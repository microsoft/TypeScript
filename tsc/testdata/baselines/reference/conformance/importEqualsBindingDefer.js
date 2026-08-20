//// [tests/cases/conformance/importDefer/importEqualsBindingDefer.ts] ////

//// [a.ts]
export = 2;

//// [b.ts]
import defer = require("./a");


//// [a.js]
"use strict";
module.exports = 2;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
