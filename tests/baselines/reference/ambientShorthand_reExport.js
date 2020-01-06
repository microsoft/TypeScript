//// [tests/cases/conformance/ambient/ambientShorthand_reExport.ts] ////

//// [declarations.d.ts]
declare module "jquery";

//// [reExportX.ts]
export {x} from "jquery";

//// [reExportAll.ts]
export * from "jquery";

//// [reExportUser.ts]
import {x} from "./reExportX";
import * as $ from "./reExportAll";
// '$' is not callable, it is an object.
x($);


//// [reExportX.js]
"use strict";
exports.__esModule = true;
var jquery_1 = require("jquery");
exports.x = jquery_1.x;
//// [reExportAll.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k) {
    Object.defineProperty(o, k, {
        enumerable: true,
        get: function() { return m[k]; }
    });
}) : (function(o, m, k) {
    o[k] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}
exports.__esModule = true;
__exportStar(require("jquery"), exports);
//// [reExportUser.js]
"use strict";
exports.__esModule = true;
var reExportX_1 = require("./reExportX");
var $ = require("./reExportAll");
// '$' is not callable, it is an object.
reExportX_1.x($);
