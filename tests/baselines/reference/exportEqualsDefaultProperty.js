//// [tests/cases/compiler/exportEqualsDefaultProperty.ts] ////

//// [exp.ts]
var x = {
    "greeting": "hello, world",
    "default": 42
};

export = x

//// [imp.ts]
import foo from "./exp";
foo.toExponential(2);


//// [exp.js]
"use strict";
var x = {
    "greeting": "hello, world",
    "default": 42
};
module.exports = x;
//// [imp.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exp_1 = require("./exp");
exp_1.default.toExponential(2);
