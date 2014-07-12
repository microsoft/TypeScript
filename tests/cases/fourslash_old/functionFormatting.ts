/// <reference path="fourslash.ts"/>

////var foo = foo(function () {
////    /**/function foo  ()  {}}    );

format.document();
goTo.marker();
verify.currentLineContentIs("    function foo() { }");