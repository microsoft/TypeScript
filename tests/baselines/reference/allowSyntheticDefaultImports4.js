//// [tests/cases/compiler/allowSyntheticDefaultImports4.ts] ////

//// [b.d.ts]
declare class Foo {
	member: string;
}
export = Foo;

//// [a.ts]
import Foo from "./b";
export var x = new Foo();


//// [a.js]
"use strict";
exports.__esModule = true;
var b_1 = require("./b");
exports.x = new b_1["default"]();
