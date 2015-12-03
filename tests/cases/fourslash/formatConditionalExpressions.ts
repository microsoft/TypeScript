/// <reference path="fourslash.ts"/>

////let v =
////    0 ? 1 :
////    //
/////*falseBranchExpression*/    2 ? 3 :
/////*indent*/
////    //
/////*falseBranchToken*/    2;

format.document();

goTo.marker("falseBranchExpression");
verify.currentLineContentIs("    2 ? 3 :");
goTo.marker("indent");
verify.indentationIs(8);
goTo.marker("falseBranchToken");
verify.currentLineContentIs("    2;");