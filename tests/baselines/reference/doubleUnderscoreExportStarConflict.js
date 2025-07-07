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
Object.defineProperty(exports, "__esModule", { value: true });
exports.__foo = __foo;
function __foo() { }
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__foo = __foo;
function __foo() { }
//// [index.js]
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
__exportStar(require("./b"), exports);
__exportStar(require("./c"), exports);
