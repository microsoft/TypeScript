//// [tests/cases/compiler/relativeNamesInClassicResolution.ts] ////

//// [a.ts]
import {x} from "./b"

//// [b.ts]
export let x = 1;

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 1;
