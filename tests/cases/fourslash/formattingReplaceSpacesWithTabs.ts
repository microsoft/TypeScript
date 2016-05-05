/// <reference path="fourslash.ts"/>

////module Foo {
/////*1*/class Test { }
/////*2*/ class Test { }
/////*3*/    class Test { }
/////*4*/     class Test { }
/////*5*/	class Test { }
/////*6*/	 class Test { }
/////*7*/		class Test { }
////}

var options = format.copyFormatOptions();
options.ConvertTabsToSpaces = false;
var oldOptions = format.setFormatOptions(options);
try {
    format.document();
    goTo.marker("1");
    verify.currentLineContentIs("\tclass Test { }")
    goTo.marker("2");
    verify.currentLineContentIs("\tclass Test { }")
    goTo.marker("3");
    verify.currentLineContentIs("\tclass Test { }")
    goTo.marker("4");
    verify.currentLineContentIs("\tclass Test { }")
    goTo.marker("5");
    verify.currentLineContentIs("\tclass Test { }")
    goTo.marker("6");
    verify.currentLineContentIs("\tclass Test { }")
    goTo.marker("7");
    verify.currentLineContentIs("\tclass Test { }")
}
finally {
    format.setFormatOptions(oldOptions);
}
