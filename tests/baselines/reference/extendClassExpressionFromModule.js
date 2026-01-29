//// [tests/cases/conformance/classes/classExpressions/extendClassExpressionFromModule.ts] ////

//// [foo1.ts]
class x{}

export = x; 

//// [foo2.ts]
import foo1 = require('./foo1');
var x = foo1;
class y extends x {}


//// [foo1.js]
"use strict";
class x {
}
module.exports = x;
//// [foo2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo1 = require("./foo1");
var x = foo1;
class y extends x {
}
