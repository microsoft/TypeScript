/// <reference path='fourslash.ts'/>

////        class A {
////            /*1*/
////        }

////module M {
////            class C {
////                /*2*/
////            }
////}

goTo.marker("1");
verify.indentationIs(12);

goTo.marker("2");
verify.indentationIs(16);
