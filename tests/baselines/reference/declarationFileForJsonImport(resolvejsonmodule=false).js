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
Object.defineProperty(exports, "__esModule", { value: true });
var data_json_1 = require("./data.json");
var x = data_json_1.default;
