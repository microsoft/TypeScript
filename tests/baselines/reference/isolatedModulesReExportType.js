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
class C {
}
exports.C = C;
//// [reExportValueAsTypeOnly.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [user.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NS = exports.C = void 0;
// OK, has a value side
var exportValue_1 = require("./exportValue");
Object.defineProperty(exports, "C", { enumerable: true, get: function () { return exportValue_1.C; } });
// OK, even though the namespace it exports is only types.
var NS = __importStar(require("./exportT"));
exports.NS = NS;
