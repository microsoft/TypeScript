//// [tests/cases/compiler/allowSyntheticDefaultImports5.ts] ////

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
const b_1 = require("./b");
exports.x = new b_1.default();
