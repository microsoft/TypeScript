//// [tests/cases/compiler/allowSyntheticDefaultImports8.ts] ////

//// [b.d.ts]
export function foo();

export function bar();

//// [a.ts]
import { default as Foo } from "./b";
Foo.bar();
Foo.foo();

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const b_1 = require("./b");
b_1.default.bar();
b_1.default.foo();
