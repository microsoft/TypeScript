/// <reference path="fourslash.ts"/>

////// top-heavy region balance
////// #region unmatched
////
////[|// #region matched
////
////// #endregion matched|]

verify.outliningSpansInCurrentFile(test.ranges(), "region");