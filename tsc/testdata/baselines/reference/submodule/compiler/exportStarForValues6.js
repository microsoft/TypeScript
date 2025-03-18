//// [tests/cases/compiler/exportStarForValues6.ts] ////

//// [file1.ts]
export interface Foo { x }

//// [file2.ts]
export * from "file1"
export var x = 1;

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
exports.x = void 0;
__exportStar(require("file1"), exports);
exports.x = 1;
