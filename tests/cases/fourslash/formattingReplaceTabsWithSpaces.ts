/// <reference path="fourslash.ts"/>

////module Foo {
/////*1*/				class Test { }
/////*2*/			class Test { }
/////*3*/class Test { }
/////*4*/			 class Test { }
/////*5*/   class Test { }
/////*6*/    class Test { }
/////*7*/     class Test { }
////}

format.document();
goTo.marker("1");
verify.currentLineContentIs("    class Test { }")
goTo.marker("2");
verify.currentLineContentIs("    class Test { }")
goTo.marker("3");
verify.currentLineContentIs("    class Test { }")
goTo.marker("4");
verify.currentLineContentIs("    class Test { }")
goTo.marker("5");
verify.currentLineContentIs("    class Test { }")
goTo.marker("6");
verify.currentLineContentIs("    class Test { }")
goTo.marker("7");
verify.currentLineContentIs("    class Test { }")
