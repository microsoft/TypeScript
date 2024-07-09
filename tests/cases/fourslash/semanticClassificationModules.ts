/// <reference path="fourslash.ts"/>

////module /*0*/M {
////    export var v;
////    export interface /*1*/I {
////    }
////}
////
////var x: /*2*/M./*3*/I = /*4*/M.v;
////var y = /*5*/M;

const c = classification("original");
verify.semanticClassificationsAre("original", 
    c.moduleName("M", test.marker("0").position),
    c.interfaceName("I", test.marker("1").position),
    c.moduleName("M", test.marker("2").position),
    c.interfaceName("I", test.marker("3").position),
    c.moduleName("M", test.marker("4").position),
    c.moduleName("M", test.marker("5").position));

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("namespace.declaration", "M"), 
    c2.semanticToken("variable.declaration.local", "v"), 
    c2.semanticToken("interface.declaration", "I"), 
    c2.semanticToken("variable.declaration", "x"), 
    c2.semanticToken("namespace", "M"), 
    c2.semanticToken("interface", "I"), 
    c2.semanticToken("namespace", "M"), 
    c2.semanticToken("variable.local", "v"), 
    c2.semanticToken("variable.declaration", "y"), 
    c2.semanticToken("namespace", "M"), 
);
