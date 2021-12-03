/// <reference path="fourslash.ts"/>

//// class Foo {
////    get #x() { return 1 };
////    set #x(value: number) { };
////    y() {};
//// }
//// class Bar extends Foo {
////    get #z() { return 1 };
////    set #z(value: number) { };
////    t() {};
////    l;
////    constructor() {
////        this./*1*/
////        class Baz {
////            get #z() { return 1 };
////            set #z(value: number) { };
////            get #u() { return 1 };
////            set #u(value: number) { };
////            v() {};
////            k;
////            constructor() {
////                this./*2*/
////                new Bar()./*3*/
////            }
////        }
////    }
//// }
////
//// new Foo()./*4*/



verify.completions({ marker: "1", unsorted: ["#z", "t", "l", "y"] });
verify.completions({ marker: "2", unsorted: ["#z", "#u", "v", "k"] });
verify.completions({ marker: "3", unsorted: ["#z", "t", "l", "y"] });
verify.completions({ marker: "4", exact: ["y"] });
