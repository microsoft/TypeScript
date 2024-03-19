//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace12.ts] ////

//// [main.ts]
import { c } from './types'
import * as types from './types'
console.log(c) // Fails as expected, import is still allowed though.
console.log(types.c) // Expected an error here.

//// [types.ts]
export type * from './values'

//// [values.ts]
export const c = 10

//// [values.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
exports.c = 10;
//// [types.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types = require("./types");
console.log(c); // Fails as expected, import is still allowed though.
console.log(types.c); // Expected an error here.
