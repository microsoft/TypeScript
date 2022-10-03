/// <reference path="fourslash.ts"/>


////[|import * as ns from "mod";
////
////import d from "mod";
////import { a, b, c } from "mod";
////
////import r = require("mod");|]
////
////// statement
////var x = 0;
////
////// another set of imports
////[|import * as ns from "mod";
////import d from "mod";
////import { a, b, c } from "mod";
////import r = require("mod");|]

verify.outliningSpansInCurrentFile(test.ranges(), "imports");
