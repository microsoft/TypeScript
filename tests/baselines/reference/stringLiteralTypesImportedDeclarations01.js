//// [tests/cases/conformance/types/stringLiteral/stringLiteralTypesImportedDeclarations01.ts] ////

//// [file1.ts]

export type A = "A";
export type B = "B";

export const a = "A";
export const b = "B";

//// [file2.ts]
import * as file1 from "./file1";

const a: file1.A = file1.a;
const b: file1.B = file1.b;

let aOrB: file1.A | file1.B;
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
export declare type A = "A";
export declare type B = "B";
export declare const a: "A";
export declare const b: "B";
//// [file2.d.ts]
