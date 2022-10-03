/// <reference path="fourslash.ts"/>

//// var x = class /*0*/C {}
//// class /*1*/C {}
//// class /*2*/D extends class /*3*/B{} { }
const c = classification("original");
verify.semanticClassificationsAre("original", 
    c.className("C", test.marker("0").position),
    c.className("C", test.marker("1").position),
    c.className("D", test.marker("2").position),
    c.className("B", test.marker("3").position)
);

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("class.declaration", "x"), 
    c2.semanticToken("class", "C"), 
    c2.semanticToken("class.declaration", "C"), 
    c2.semanticToken("class.declaration", "D"), 
    c2.semanticToken("class", "B"), 
);
