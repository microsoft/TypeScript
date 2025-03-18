//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace11.ts] ////

//// [main.ts]
import * as intermediate from './intermediate'
const ghost: intermediate.Ghost = new intermediate.Ghost()

//// [intermediate.ts]
export type * from './ghost'

//// [ghost.ts]
export class Ghost {}

//// [ghost.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ghost = void 0;
class Ghost {
}
exports.Ghost = Ghost;
//// [intermediate.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const intermediate = require("./intermediate");
const ghost = new intermediate.Ghost();
