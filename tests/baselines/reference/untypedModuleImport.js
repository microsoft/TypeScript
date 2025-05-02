//// [tests/cases/conformance/moduleResolution/untypedModuleImport.ts] ////

//// [index.js]
This file is not processed.

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
Object.defineProperty(exports, "__esModule", { value: true });
var foo = require("foo");
foo.bar();
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo = require("foo");
foo();
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo_1 = require("foo");
require("./a");
require("./b");
(0, foo_1.default)((0, foo_1.bar)());
