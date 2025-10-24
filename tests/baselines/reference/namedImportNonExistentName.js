//// [tests/cases/compiler/namedImportNonExistentName.ts] ////

//// [foo.d.ts]
export = Foo;
export as namespace Foo;

declare namespace Foo {
    function foo();
}

//// [foo2.ts]
let x: { a: string; c: string; } | { b: number; c: number; };
export = x

//// [bar.ts]
import { Bar, toString, foo } from './foo';
foo();
import { a, b, c, d, toString as foo2String } from './foo2';
c;

//// [foo2.js]
"use strict";
let x;
module.exports = x;
//// [bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo_1 = require("./foo");
(0, foo_1.foo)();
const foo2_1 = require("./foo2");
foo2_1.c;
