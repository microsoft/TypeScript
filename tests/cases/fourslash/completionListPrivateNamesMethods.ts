/// <reference path="fourslash.ts"/>

//// class Foo {
////    #x() {};
////    y() {};
//// }
//// class Bar extends Foo {
////    #z() {};
////    t() {};
////    constructor() {
////        this./*1*/
////        class Baz {
////            #z() {};
////            #u() {};
////            v() {};
////            constructor() {
////                this./*2*/
////                new Bar()./*3*/
////            }
////        }
////    }
//// }
////
//// new Foo()./*4*/



verify.completions({ marker: "1", exact: ["#z", "t", "y"] });
verify.completions({ marker: "2", exact: ["#z", "#u", "v"] });
verify.completions({ marker: "3", exact: ["#z", "t", "y"] });
verify.completions({ marker: "4", exact: ["y"] });
