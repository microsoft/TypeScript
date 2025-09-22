//// [tests/cases/conformance/externalModules/exportDeclaredModule.ts] ////

//// [foo1.ts]
declare namespace M1 {
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
Object.defineProperty(exports, "__esModule", { value: true });
var foo1 = require("./foo1");
var x = foo1.b();
