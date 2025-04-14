//// [tests/cases/compiler/isolatedModulesReExportType.ts] ////

//// [exportT.ts]
export type T = number;

//// [exportValue.ts]
export class C {}

//// [exportEqualsT.ts]
declare type T = number;
export = T;

//// [bar.d.ts]
export type T = number;

//// [index.d.ts]
export { T } from "./bar"; // In a declaration file, so not an error.

//// [index.d.ts]
declare module "baz" {
    export { T } from "foo"; // Also allowed.
}

//// [reExportValueAsTypeOnly.ts]
export type { C } from "./exportValue";

//// [user.ts]
// Error, can't re-export something that's only a type.
export { T } from "./exportT";
export import T2 = require("./exportEqualsT");

// OK, has a value side
export { C } from "./exportValue";

// OK, even though the namespace it exports is only types.
import * as NS from "./exportT";
export { NS };

// OK, syntactically clear that a type is being re-exported.
export type T3 = T;

// Error, not clear (to an isolated module) whether `T4` is a type.
import { T } from "./exportT";
export { T as T4 };

// Ok, type-only import indicates that the export can be elided.
import type { T as TT } from "./exportT";
export { TT };

// Error, type-only declaration is in a different file.
import { C as CC } from "./reExportValueAsTypeOnly";
export { CC };


//// [exportT.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [exportEqualsT.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [exportValue.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;
//// [reExportValueAsTypeOnly.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [user.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NS = exports.C = void 0;
// OK, has a value side
var exportValue_1 = require("./exportValue");
Object.defineProperty(exports, "C", { enumerable: true, get: function () { return exportValue_1.C; } });
// OK, even though the namespace it exports is only types.
var NS = require("./exportT");
exports.NS = NS;
