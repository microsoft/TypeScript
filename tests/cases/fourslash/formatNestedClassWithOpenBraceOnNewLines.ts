/// <reference path="fourslash.ts" />

////module A
////{
////    class B {
////        /*1*/
////}

format.setOption("PlaceOpenBraceOnNewLineForControlBlocks", true);
format.setOption("PlaceOpenBraceOnNewLineForFunctions", true);
goTo.marker("1");
edit.insert("}");

verify.currentFileContentIs(
"module A\n\
{\n\
    class B\n\
    {\n\
    }\n\
}"
);