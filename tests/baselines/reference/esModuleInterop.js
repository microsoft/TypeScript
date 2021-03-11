//// [tests/cases/compiler/esModuleInterop.ts] ////

//// [index.d.ts]
export function sayHello(): string;
//// [path.d.ts]
declare const anything: any;
export = anything;
//// [fs.d.ts]
declare const anything: any;
export = anything;
//// [mjts.ts]
import { sayHello } from "./hybrid";
import path from "./path";
import * as fs from "./fs";

path;
sayHello();
fs;


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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var hybrid_1 = require("./hybrid");
var path_1 = __importDefault(require("./path"));
var fs = __importStar(require("./fs"));
path_1["default"];
(0, hybrid_1.sayHello)();
fs;
