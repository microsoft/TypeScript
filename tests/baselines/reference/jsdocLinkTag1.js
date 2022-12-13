//// [tests/cases/conformance/jsdoc/jsdocLinkTag1.ts] ////

//// [a.ts]
export interface A {}

//// [b.ts]
import type { A } from "./a";

/** {@link A} */
export interface B {}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
