//// [tests/cases/compiler/InfinityAndNaNImports3.ts] ////

//// [foo.ts]
export type Foo = 42;
export type Bar = "no";
export type Baz = true;

export const Foo = 42;
export const Bar = "no";
export const Baz = true;

//// [bar.ts]
import { Foo as Infinity, Bar as NaN, Baz as undefined } from "./foo";

Infinity;
NaN;
-Infinity;
-NaN;
undefined;
type t1 = Infinity;
type t2 = NaN;
type t3 = -Infinity;
type t4 = -NaN;
type t5 = undefined;


//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Baz = exports.Bar = exports.Foo = void 0;
exports.Foo = 42;
exports.Bar = "no";
exports.Baz = true;
//// [bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo_1 = require("./foo");
foo_1.Foo;
foo_1.Bar;
-foo_1.Foo;
-foo_1.Bar;
foo_1.Baz;
