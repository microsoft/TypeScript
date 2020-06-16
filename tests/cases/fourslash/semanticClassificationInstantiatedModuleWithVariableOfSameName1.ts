/// <reference path="fourslash.ts"/>

////module /*0*/M {
////    export interface /*1*/I {
////    }
////    var x = 10;
////}
////
////var /*2*/M = {
////    foo: 10,
////    bar: 20
////}
////
////var v: /*3*/M./*4*/I;
////
////var x = /*5*/M;

const c = classification("original");
verify.semanticClassificationsAre("original", 
    c.moduleName("M", test.marker("0").position),
    c.interfaceName("I", test.marker("1").position),
    c.moduleName("M", test.marker("3").position),
    c.interfaceName("I", test.marker("4").position),
    c.moduleName("M", test.marker("5").position));


const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("namespace.declaration", "M"), 
    c2.semanticToken("interface.declaration", "I"), 
    c2.semanticToken("variable.declaration.local", "x"), 
    c2.semanticToken("variable.declaration", "M"), 
    c2.semanticToken("property.declaration", "foo"), 
    c2.semanticToken("property.declaration", "bar"), 
    c2.semanticToken("variable.declaration", "v"), 
    c2.semanticToken("namespace", "M"), 
    c2.semanticToken("interface", "I"), 
    c2.semanticToken("variable.declaration", "x"), 
    c2.semanticToken("namespace", "M"), 
);
