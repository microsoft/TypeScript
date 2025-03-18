//// [tests/cases/compiler/exportStarForValues10.ts] ////

//// [file0.ts]
export var v = 1;

//// [file1.ts]
export interface Foo { x }

//// [file2.ts]
export * from "file0";
export * from "file1";
var x = 1;

//// [file0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v = void 0;
exports.v = 1;
//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file2.js]
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
__exportStar(require("file0"), exports);
__exportStar(require("file1"), exports);
var x = 1;
