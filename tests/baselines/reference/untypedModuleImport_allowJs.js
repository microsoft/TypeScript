//// [tests/cases/conformance/moduleResolution/untypedModuleImport_allowJs.ts] ////

//// [package.json]
// Same as untypedModuleImport.ts but with --allowJs (which has no effect)

{}

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
