/// <reference path="fourslash.ts"/>

// #22732

////[|/*
///// * Some text
////  */|]

verify.outliningHintSpansInCurrentFile(test.ranges());
