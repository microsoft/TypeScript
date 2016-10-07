//// [tests/cases/conformance/moduleResolution/untypedModuleImport.ts] ////

//// [package.json]
// This tests that an import can be matched by a `package.json`, giving us untyped import

{}

// This is ignored because we don't have --allowJs
//// [index.js]
I am ignored

//// [a.ts]
import * as foo from "foo";
foo.bar();

//// [b.ts]
import foo = require("foo");
foo();

//// [c.ts]
import foo, { bar } from "foo";
import "./a";
import "./b";
foo(bar());


//// [a.js]
"use strict";
var foo = require("foo");
foo.bar();
//// [b.js]
"use strict";
var foo = require("foo");
foo();
//// [c.js]
"use strict";
var foo_1 = require("foo");
require("./a");
require("./b");
foo_1["default"](foo_1.bar());
