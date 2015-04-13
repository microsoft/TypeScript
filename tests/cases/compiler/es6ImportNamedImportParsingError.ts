// @target: es6

// @filename: es6ImportNamedImportParsingError_0.ts
export var a = 10;
export var x = a;
export var m = a;

// @filename: es6ImportNamedImportParsingError_1.ts
import { * } from "es6ImportNamedImportParsingError_0";
import defaultBinding, from "es6ImportNamedImportParsingError_0";
import , { a } from "es6ImportNamedImportParsingError_0";
import { a }, from "es6ImportNamedImportParsingError_0";