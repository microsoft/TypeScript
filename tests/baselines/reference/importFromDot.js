//// [tests/cases/conformance/moduleResolution/importFromDot.ts] ////

//// [a.ts]
export const rootA = 0;

//// [index.ts]
export const indexInA = 0;

//// [b.ts]
import { indexInA, rootA } from ".";


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootA = void 0;
exports.rootA = 0;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexInA = void 0;
exports.indexInA = 0;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
