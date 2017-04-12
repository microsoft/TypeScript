//// [tests/cases/conformance/externalModules/exportDeclaredModule.ts] ////

//// [foo1.ts]
declare module M1 {
	export var a: string; 
	export function b(): number;
}
export = M1;

//// [foo2.ts]
import foo1 = require('./foo1');
var x: number = foo1.b();

//// [foo1.js]
"use strict";
module.exports = M1;
//// [foo2.js]
"use strict";
exports.__esModule = true;
var foo1 = require("./foo1");
var x = foo1.b();
