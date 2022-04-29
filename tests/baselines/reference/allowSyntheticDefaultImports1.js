//// [tests/cases/compiler/allowSyntheticDefaultImports1.ts] ////

//// [a.ts]
import Namespace from "./b";
export var x = new Namespace.Foo();

//// [b.d.ts]
export class Foo {
	member: string;
}


//// [a.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
var b_1 = require("./b");
exports.x = new b_1["default"].Foo();
