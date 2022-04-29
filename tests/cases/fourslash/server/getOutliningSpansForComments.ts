/// <reference path="../fourslash.ts"/>

////[|/*
////    Block comment at the beginning of the file before module:
////        line one of the comment
////        line two of the comment
////        line three
////        line four
////        line five
////*/|]
////declare module "m";
////[|// Single line comments at the start of the file
////// line 2
////// line 3
////// line 4|]
////declare module "n";

verify.outliningSpansInCurrentFile(test.ranges(), "comment");
