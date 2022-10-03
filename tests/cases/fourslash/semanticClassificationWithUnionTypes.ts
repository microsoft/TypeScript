////module /*0*/M {
////    export interface /*1*/I {
////    }
////}
////
////interface /*2*/I {
////}
////class /*3*/C {
////}
////
////var M: /*4*/M./*5*/I | /*6*/I | /*7*/C;
////var I: typeof M | typeof /*8*/C;

const c = classification("original");
verify.semanticClassificationsAre("original", 
    c.moduleName("M", test.marker("0").position),
    c.interfaceName("I", test.marker("1").position),
    c.interfaceName("I", test.marker("2").position),
    c.className("C", test.marker("3").position),
    c.moduleName("M", test.marker("4").position),
    c.interfaceName("I", test.marker("5").position),
    c.interfaceName("I", test.marker("6").position),
    c.className("C", test.marker("7").position),
    c.className("C", test.marker("8").position));

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("variable", "M"), 
    c2.semanticToken("interface.declaration", "I"), 
    c2.semanticToken("interface.declaration", "I"), 
    c2.semanticToken("class.declaration", "C"), 
    c2.semanticToken("variable.declaration", "M"), 
    c2.semanticToken("variable", "M"), 
    c2.semanticToken("interface", "I"), 
    c2.semanticToken("interface", "I"), 
    c2.semanticToken("class", "C"), 
    c2.semanticToken("class.declaration", "I"), 
    c2.semanticToken("variable", "M"), 
    c2.semanticToken("class", "C"), 
);
