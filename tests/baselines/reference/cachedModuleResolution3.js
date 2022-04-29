//// [tests/cases/compiler/cachedModuleResolution3.ts] ////

//// [foo.d.ts]
export declare let x: number

//// [app.ts]
import {x} from "foo";

//// [lib.ts]
import {x} from "foo";

//// [app.js]
"use strict";
exports.__esModule = true;
//// [lib.js]
"use strict";
exports.__esModule = true;
