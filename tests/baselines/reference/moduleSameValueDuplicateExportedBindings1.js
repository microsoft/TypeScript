//// [tests/cases/compiler/moduleSameValueDuplicateExportedBindings1.ts] ////

//// [a.ts]
export * from "./b";
export * from "./c";

//// [b.ts]
export * from "./c";

//// [c.ts]
export var foo = 42;

//// [c.js]
"use strict";
exports.__esModule = true;
exports.foo = 42;
//// [b.js]
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
__exportStar(require("./c"), exports);
//// [a.js]
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
__exportStar(require("./b"), exports);
__exportStar(require("./c"), exports);
