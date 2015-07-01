/// <reference path="fourslash.ts"/>

////module /*0*/M {
////    export class /*1*/C {
////        static x;
////    }
////    export enum /*2*/E {
////        E1 = 0
////    }
////}
////`abcd${ /*3*/M./*4*/C.x + /*5*/M./*6*/E.E1}efg`

var c = classification;
verify.semanticClassificationsAre(
    c.moduleName("M", test.marker("0").position),
    c.className("C", test.marker("1").position),
    c.enumName("E", test.marker("2").position),
    c.moduleName("M", test.marker("3").position),
    c.className("C", test.marker("4").position),
    c.moduleName("M", test.marker("5").position),
    c.enumName("E", test.marker("6").position));
