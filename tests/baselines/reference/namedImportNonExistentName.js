//// [tests/cases/compiler/namedImportNonExistentName.ts] ////

//// [foo.d.ts]
export = Foo;
export as namespace Foo;

declare namespace Foo {
    function foo();
}

//// [bar.ts]
import { Bar, toString, foo } from './foo';
foo();

//// [bar.js]
"use strict";
exports.__esModule = true;
var foo_1 = require("./foo");
foo_1.foo();
