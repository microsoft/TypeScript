/// <reference path='fourslash.ts' />

////function foo(
////    first:
////    number,/*first*/
////    second: (
////    string/*second*/
////    ),
////    third:
////    (
////    boolean/*third*/
////    )
////) {
////}

format.document();

goTo.marker("first");
verify.currentLineContentIs("        number,");
goTo.marker("second");
verify.currentLineContentIs("        string");
goTo.marker("third");
verify.currentLineContentIs("            boolean");