//// [tests/cases/compiler/cachedModuleResolution6.ts] ////

//// [app.ts]
import {x} from "foo";

//// [lib.ts]
import {x} from "foo";

//// [app.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [lib.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
