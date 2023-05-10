//// [tests/cases/compiler/cachedModuleResolution5.ts] ////

//// [foo.d.ts]
export declare let x: number

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
