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

var c = classification;
verify.semanticClassificationsAre(
    c.moduleName("M", test.marker("0").position),
    c.interfaceName("I", test.marker("1").position),
    c.interfaceName("I", test.marker("2").position),
    c.className("C", test.marker("3").position),
    c.moduleName("M", test.marker("4").position),
    c.interfaceName("I", test.marker("5").position),
    c.interfaceName("I", test.marker("6").position),
    c.className("C", test.marker("7").position),
    c.className("C", test.marker("8").position));