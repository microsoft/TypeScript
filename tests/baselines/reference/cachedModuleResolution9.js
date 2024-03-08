//// [tests/cases/compiler/cachedModuleResolution9.ts] ////

//// [lib.ts]
import {x} from "foo";


//// [app.ts]
import {x} from "foo";


//// [lib.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [app.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
