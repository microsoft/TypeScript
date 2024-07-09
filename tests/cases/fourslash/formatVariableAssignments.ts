/// <reference path="fourslash.ts"/>

////let t: number;
////t
/////*nextlineWithEqual*/=2+2;
////t=
/////*nextlineWithoutEqual*/2
/////*nextline2*/+2;
////t
/////*addition*/+= 22
/////*nextlineSemicolon*/;
////t
////=t
/////*chained*/=t+ 4;

format.document();

goTo.marker("nextlineWithEqual");
verify.indentationIs(4);
verify.currentLineContentIs("    = 2 + 2;");
goTo.marker("nextlineWithoutEqual");
verify.indentationIs(4);
verify.currentLineContentIs("    2");
goTo.marker("nextline2");
verify.indentationIs(4);
verify.currentLineContentIs("    + 2;");
goTo.marker("addition");
verify.indentationIs(4);
verify.currentLineContentIs("    += 22");
goTo.marker("nextlineSemicolon");
verify.indentationIs(4);
verify.currentLineContentIs("    ;");
goTo.marker("chained");
verify.indentationIs(4);
verify.currentLineContentIs("    = t + 4;");