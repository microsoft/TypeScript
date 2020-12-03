/// <reference path="fourslash.ts"/>

//// <<<<<<< HEAD
//// "AAAA"
//// =======
//// "BBBB"
//// >>>>>>> Feature


const c = classification("original");
verify.syntacticClassificationsAre(
    c.comment("<<<<<<< HEAD"),
    c.stringLiteral("\"AAAA\""),
    c.comment("======="),
    c.stringLiteral("\"BBBB\""),
    c.comment(">>>>>>> Feature"));

const c2 = classification("2020");
    verify.semanticClassificationsAre("2020",
);
