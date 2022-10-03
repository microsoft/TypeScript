/// <reference path="fourslash.ts"/>

////declare module /*0*/M {
////    interface /*1*/I {
////
////    }
////}
////
////var M = { I: 10 };

const c = classification("original");
verify.semanticClassificationsAre("original", 
    c.moduleName("M", test.marker("0").position),
    c.interfaceName("I", test.marker("1").position));

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("variable", "M"), 
    c2.semanticToken("interface.declaration", "I"), 
    c2.semanticToken("variable.declaration", "M"), 
    c2.semanticToken("property.declaration", "I"), 
);
    