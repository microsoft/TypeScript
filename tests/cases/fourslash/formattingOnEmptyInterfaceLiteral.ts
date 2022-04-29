/// <reference path='fourslash.ts' />

/////*1*/    function    foo  (  x  :    {    }    )    {    }
////
/////*2*/foo    (  {     }   )    ;
////
////
////
/////*3*/            interface    bar    {
/////*4*/                x   :    {     }   ;
/////*5*/       y  :       (         )    =>    {     }   ;
/////*6*/                                                    }
format.document();
goTo.marker("1");
verify.currentLineContentIs("function foo(x: {}) { }");
goTo.marker("2");
verify.currentLineContentIs("foo({});");
goTo.marker("3");
verify.currentLineContentIs("interface bar {");
goTo.marker("4");
verify.currentLineContentIs("    x: {};");
goTo.marker("5");
verify.currentLineContentIs("    y: () => {};");
goTo.marker("6");
verify.currentLineContentIs("}");