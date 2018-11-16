/// <reference path="fourslash.ts"/>

////// bottom-heavy region balance
////[|// #region matched
////
////// #endregion matched|]
////
////// #endregion unmatched

verify.outliningSpansInCurrentFile(test.ranges(), "region");