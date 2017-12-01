/// <reference path="fourslash.ts"/>

////class C {
////    /*method*/async [0]() { }
////}

format.document();
goTo.marker("method");
verify.currentLineContentIs("    async [0]() { }");
