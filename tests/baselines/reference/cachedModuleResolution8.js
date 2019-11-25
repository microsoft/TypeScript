//// [tests/cases/compiler/cachedModuleResolution8.ts] ////

//// [app.ts]
import {x} from "foo";

//// [lib.ts]
import {x} from "foo";

//// [app.js]
"use strict";
exports.__esModule = true;
require("foo");
//// [lib.js]
"use strict";
exports.__esModule = true;
require("foo");
