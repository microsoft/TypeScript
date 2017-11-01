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
function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
exports.__esModule = true;
var b_1 = __importDefault(require("./b"));
exports.x = new b_1["default"]();
