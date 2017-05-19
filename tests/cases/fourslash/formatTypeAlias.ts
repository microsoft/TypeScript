/// <reference path="fourslash.ts"/>

////type   Alias = /*typeKeyword*/
/////*indent*/
////number;/*autoformat*/

format.document();

goTo.marker("typeKeyword");
verify.currentLineContentIs("type Alias =");
goTo.marker("indent");
verify.indentationIs(4);
goTo.marker("autoformat");
verify.currentLineContentIs("    number;");
