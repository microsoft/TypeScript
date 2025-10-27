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
export var a = 10;
export var x = a;
export var m = a;
//// [es6ImportNamedImportParsingError_1.js]
from;
"es6ImportNamedImportParsingError_0";
{
    a;
}
from;
"es6ImportNamedImportParsingError_0";
import { a } from , from;
"es6ImportNamedImportParsingError_0";
