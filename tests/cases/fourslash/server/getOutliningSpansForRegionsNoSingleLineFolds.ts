////[|//#region
////function foo()[| {
////
////}|]
////[|//these
//////should|]
//////#endregion not you|]
////[|// be
////// together|]
////
////[|//#region bla bla bla
////
////function bar()[| { }|]
////
//////#endregion|]

verify.outliningSpansInCurrentFile(test.ranges());