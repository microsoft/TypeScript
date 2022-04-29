//// [tests/cases/compiler/cachedModuleResolution7.ts] ////

//// [lib.ts]
import {x} from "foo";

//// [app.ts]
import {x} from "foo";


//// [lib.js]
"use strict";
exports.__esModule = true;
//// [app.js]
"use strict";
exports.__esModule = true;
