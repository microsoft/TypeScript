/// <reference path='fourslash.ts'/>
////class A {
////foo(              ); // /*1*/
////}
////function foo() {       var x;       } // /*2*/

goTo.marker("1");
edit.insert(";");
verify.currentLineContentIs("foo(              ); // ;")

goTo.marker("2");
edit.insert("}");
verify.currentLineContentIs("function foo() {       var x;       } // }");