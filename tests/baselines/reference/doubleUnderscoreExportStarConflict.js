//// [tests/cases/compiler/doubleUnderscoreExportStarConflict.ts] ////

//// [index.tsx]
export * from "./b";
export * from "./c";

//// [b.ts]
export function __foo(): number | void {}

//// [c.ts]
export function __foo(): string | void {}


//// [b.js]
"use strict";
exports.__esModule = true;
exports.__foo = void 0;
function __foo() { }
exports.__foo = __foo;
//// [c.js]
"use strict";
exports.__esModule = true;
exports.__foo = void 0;
function __foo() { }
exports.__foo = __foo;
//// [index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
__exportStar(require("./b"), exports);
__exportStar(require("./c"), exports);
