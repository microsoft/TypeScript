//// [tests/cases/conformance/types/stringLiteral/stringLiteralTypesImportedDeclarations02.ts] ////

//// [file1.ts]

export const a = "A";
export const b = "B";

//// [file2.ts]
import * as file1 from "./file1";

const a: "A" = file1.a;
const b: "B" = file1.b;

let aOrB: "A" | "B";
aOrB = file1.a;
aOrB = file1.b;


//// [file1.js]
"use strict";
exports.a = "A";
exports.b = "B";
//// [file2.js]
"use strict";
var file1 = require("./file1");
var a = file1.a;
var b = file1.b;
var aOrB;
aOrB = file1.a;
aOrB = file1.b;


//// [file1.d.ts]
export declare const a: "A";
export declare const b: "B";
//// [file2.d.ts]
