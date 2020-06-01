/// <reference path="fourslash.ts"/>

//// module /*0*/M {
////     export interface /*1*/I {
////     }
//// }
//// interface /*2*/X extends /*3*/M./*4*/I { }

var c = classification("original");
verify.semanticClassificationsAre("original", 
    c.moduleName("M", test.marker("0").position),
    c.interfaceName("I", test.marker("1").position),
    c.interfaceName("X", test.marker("2").position),
    c.moduleName("M", test.marker("3").position),
    c.interfaceName("I", test.marker("4").position));

    // // TODO: test like:   
    // // c2.token("module", "M", test.marker("0").position))

var c2 = classification("2020")
verify.semanticClassificationsAre("2020", 
    c2.token(1025, "M", test.marker("0").position),
    c2.token(769, "I", test.marker("1").position),
    c2.token(769, "X", test.marker("2").position),
    c2.token(1024, "M", test.marker("3").position),
    c2.token(768, "I", test.marker("4").position),
)
// { textSpan: { start: 7,  end: 1 }, classificationType: 1025 },
// { textSpan: { start: 32, end: 1 }, classificationType: 769 },
// { textSpan: { start: 54, end: 1 }, classificationType: 769 },
// { textSpan: { start: 64, end: 1 }, classificationType: 1024 },
// { textSpan: { start: 66, end: 1 }, classificationType: 768 } );


