//// [tests/cases/compiler/allowSyntheticDefaultImports9.ts] ////

//// [b.d.ts]
export function foo();

export function bar();

//// [a.ts]
import { default as Foo } from "./b";
Foo.bar();
Foo.foo();

//// [a.js]
"use strict";
exports.__esModule = true;
var b_1 = require("./b");
b_1["default"].bar();
b_1["default"].foo();
