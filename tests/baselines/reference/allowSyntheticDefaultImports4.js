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
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
var b_1 = require("./b");
exports.x = new b_1.default();
