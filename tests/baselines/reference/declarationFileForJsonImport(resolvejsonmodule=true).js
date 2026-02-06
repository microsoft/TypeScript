//// [tests/cases/conformance/nonjsExtensions/declarationFileForJsonImport.ts] ////

//// [main.ts]
import data from "./data.json";
let x: string = data;
//// [data.json]
{}
//// [data.d.json.ts]
declare var val: string;
export default val;

//// [main.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_json_1 = __importDefault(require("./data.json"));
let x = data_json_1.default;
