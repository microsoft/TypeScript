/// <reference path="fourslash.ts"/>

// #22732

////console.log(0);
////[|/*
///// * Some text
////  */|]

verify.outliningHintSpansInCurrentFile(test.ranges());
