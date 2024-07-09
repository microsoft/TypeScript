/// <reference path="fourslash.ts"/>

////// region without label
////[|// #region
////
////// #endregion|]
////
////// region without label with trailing spaces
////[|// #region  
////
////// #endregion|]
////
////// region with label
////[|// #region label1
////
////// #endregion|]
////
////// region with extra whitespace in all valid locations
////             [|//              #region          label2    label3
////
////        //        #endregion|]
////
////// No space before directive
////[|//#region label4
////
//////#endregion|]
////
////// Nested regions
////[|// #region outer
////
////[|// #region inner
////
////// #endregion inner|]
////
////// #endregion outer|]
////
////// region delimiters not valid when there is preceding text on line
//// test // #region invalid1
////
////test // #endregion
////
////// region delimiters not valid when in multiline comment
/////*
////// #region invalid2
////*/
////
/////*
////// #endregion
////*/

verify.outliningSpansInCurrentFile(test.ranges(), "region");