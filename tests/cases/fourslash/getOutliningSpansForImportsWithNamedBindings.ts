/// <reference path="fourslash.ts"/>


////[|import [|{
////    a,
////    b as B,
////    c
////}|] from "mod";
////
////
////import { } from "mod";
////import * as ns from "mod";
////import d from "mod";|]

verify.outliningSpansInCurrentFile(test.ranges(), "import");


