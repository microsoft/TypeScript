//// [tests/cases/compiler/esModuleInteropWithExportStar.ts] ////

//// [fs.d.ts]
export const x: number;
//// [mjts.ts]
import * as fs from "./fs";

fs;

export * from "./fs";
export {x} from "./fs";
export {x as y} from "./fs";


//// [mjts.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("./fs"));
fs;
__exportStar(require("./fs"), exports);
var fs_1 = require("./fs");
Object.defineProperty(exports, "x", { enumerable: true, get: function () { return fs_1.x; } });
var fs_2 = require("./fs");
Object.defineProperty(exports, "y", { enumerable: true, get: function () { return fs_2.x; } });
