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

const c = classification("original");
verify.semanticClassificationsAre("original", 
    c.moduleName("M", test.marker("0").position),
    c.className("C", test.marker("1").position),
    c.enumName("E", test.marker("2").position),
    c.moduleName("M", test.marker("3").position),
    c.className("C", test.marker("4").position),
    c.moduleName("M", test.marker("5").position),
    c.enumName("E", test.marker("6").position));

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("namespace.declaration", "M"), 
    c2.semanticToken("class.declaration", "C"), 
    c2.semanticToken("property.declaration.static", "x"), 
    c2.semanticToken("enum.declaration", "E"), 
    c2.semanticToken("enumMember.declaration.readonly", "E1"), 
    c2.semanticToken("namespace", "M"), 
    c2.semanticToken("class", "C"), 
    c2.semanticToken("property.static", "x"), 
    c2.semanticToken("namespace", "M"), 
    c2.semanticToken("enum", "E"), 
    c2.semanticToken("enumMember.readonly", "E1"), 
);
