//// [tests/cases/compiler/assertionFunctionWildcardImport1.ts] ////

//// [ts.ts]
import * as Debug from "../debug";
export { Debug };

//// [debug.ts]
export declare function assert(expression: unknown): asserts expression;


//// [foo.ts]
import * as ts from "./_namespaces/ts";
import { Debug } from "./_namespaces/ts";

ts.Debug.assert(true);
Debug.assert(true);


//// [ts.ts]
export * from "../../core/_namespaces/ts"


//// [bar.ts]
import * as ts from "./_namespaces/ts";
import { Debug } from "./_namespaces/ts";

ts.Debug.assert(true);
Debug.assert(true);


//// [debug.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [ts.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debug = void 0;
var Debug = require("../debug");
exports.Debug = Debug;
//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("./_namespaces/ts");
var ts_1 = require("./_namespaces/ts");
ts.Debug.assert(true);
ts_1.Debug.assert(true);
//// [ts.js]
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("../../core/_namespaces/ts"), exports);
//// [bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("./_namespaces/ts");
var ts_1 = require("./_namespaces/ts");
ts.Debug.assert(true);
ts_1.Debug.assert(true);
