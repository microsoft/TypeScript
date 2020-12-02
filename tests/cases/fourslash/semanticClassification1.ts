/// <reference path="fourslash.ts"/>

//// module /*0*/M {
////     export interface /*1*/I {
////     }
//// }
//// interface /*2*/X extends /*3*/M./*4*/I { }

const c = classification("original");
verify.semanticClassificationsAre("original", 
    c.moduleName("M", test.marker("0").position),
    c.interfaceName("I", test.marker("1").position),
    c.interfaceName("X", test.marker("2").position),
    c.moduleName("M", test.marker("3").position),
    c.interfaceName("I", test.marker("4").position));

var c2 = classification("2020")
verify.semanticClassificationsAre("2020", 
    c2.semanticToken("namespace.declaration", "M"),
    c2.semanticToken("interface.declaration", "I"),
    c2.semanticToken("interface.declaration", "X"),
    c2.semanticToken("namespace", "M"),
    c2.semanticToken("interface", "I"),
)

