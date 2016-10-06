//// [tests/cases/conformance/typings/typingsLookup5.ts] ////

//// [package.json]
{}

//// [a.ts]
import * as foo from "foo";
foo.bar();

//// [b.ts]
import foo = require("foo");
foo();

//// [c.ts]
import foo, { bar } from "foo";
foo(bar());


//// [c.js]
"use strict";
var foo_1 = require("foo");
foo_1["default"](foo_1.bar());
