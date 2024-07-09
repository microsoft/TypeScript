/// <reference path="fourslash.ts"/>

//// interface /*0*/Thing {
////     toExponential(): number;
//// }
//// 
//// var Thing = 0;
//// Thing.toExponential();

const c = classification("original");
verify.semanticClassificationsAre("original", c.interfaceName("Thing", test.marker("0").position));

const c2 = classification("2020");
verify.semanticClassificationsAre("2020", 
    c2.semanticToken("interface.declaration", "Thing"),
    c2.semanticToken("member.declaration", "toExponential"),
    c2.semanticToken("variable.declaration", "Thing"),
    c2.semanticToken("variable", "Thing"),
    c2.semanticToken("member.defaultLibrary", "toExponential")
);
