/// <reference path="fourslash.ts"/>

////type   Union = number  |  {}/*formatOperator*/
/////*indent*/
////|string/*autoformat*/

format.document();

goTo.marker("formatOperator");
verify.currentLineContentIs("type Union = number | {}");
goTo.marker("indent");
verify.indentationIs(4);
goTo.marker("autoformat");
verify.currentLineContentIs("    | string");