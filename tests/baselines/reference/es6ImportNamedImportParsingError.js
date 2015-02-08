//// [tests/cases/compiler/es6ImportNamedImportParsingError.ts] ////

//// [es6ImportNamedImportParsingError_0.ts]

export var a = 10;
export var x = a;
export var m = a;

//// [es6ImportNamedImportParsingError_1.ts]
import { * } from "es6ImportNamedImportParsingError_0";
import defaultBinding, from "es6ImportNamedImportParsingError_0";
import , { a } from "es6ImportNamedImportParsingError_0";
import { a }, from "es6ImportNamedImportParsingError_0";

//// [es6ImportNamedImportParsingError_0.js]
exports.a = 10;
exports.x = exports.a;
exports.m = exports.a;
//// [es6ImportNamedImportParsingError_1.js]
from;
"es6ImportNamedImportParsingError_0";
{
    a;
}
from;
"es6ImportNamedImportParsingError_0";
var _a = require();
var a = _a.a;
"es6ImportNamedImportParsingError_0";
