/// <reference path="fourslash.ts"/>

////type   Union = number  |  {}/*formatBarOperator*/
/////*indent*/
////|string/*autoformat*/
////type  Intersection   =   Foo    &    Bar;/*formatAmpersandOperator*/
////type Complexed =
////    Foo&
////    Bar|/*unionTypeNoIndent*/
////    Baz;/*intersectionTypeNoIndent*/

format.document();

goTo.marker("formatBarOperator");
verify.currentLineContentIs("type Union = number | {}");
goTo.marker("indent");
verify.indentationIs(4);
goTo.marker("autoformat");
verify.currentLineContentIs("    | string");
goTo.marker("formatAmpersandOperator");
verify.currentLineContentIs("type Intersection = Foo & Bar;");

goTo.marker("unionTypeNoIndent");
verify.currentLineContentIs("    Bar |");
goTo.marker("intersectionTypeNoIndent");
verify.currentLineContentIs("    Baz;");