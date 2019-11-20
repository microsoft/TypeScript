/// <reference path="fourslash.ts"/>

//// <<<<<<< HEAD
//// "AAAA"
//// =======
//// "BBBB"
//// >>>>>>> Feature


var c = classification;
verify.syntacticClassificationsAre(
    c.comment("<<<<<<< HEAD"),
    c.stringLiteral("\"AAAA\""),
    c.comment("======="),
    c.stringLiteral("\"BBBB\""),
    c.comment(">>>>>>> Feature"));