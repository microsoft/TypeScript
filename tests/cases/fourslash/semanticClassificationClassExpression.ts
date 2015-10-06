/// <reference path="fourslash.ts"/>

//// var x = class /*0*/C {}
//// class /*1*/C {}
//// class /*2*/D extends class /*3*/B{} { }
var c = classification;
verify.semanticClassificationsAre(
    c.className("C", test.marker("0").position),
    c.className("C", test.marker("1").position),
    c.className("D", test.marker("2").position),
    c.className("B", test.marker("3").position)
);