/// <reference path="fourslash.ts"/>

////class Thing extends (
////    class/*classOpenBrace*/
////    {
/////*classIndent*/
////    protected  doThing() {/*methodAutoformat*/
/////*methodIndent*/
////    }
////    }
////) {
////}

format.document();

goTo.marker("classOpenBrace");
verify.currentLineContentIs("    class {");
goTo.marker("classIndent");
verify.indentationIs(8);
goTo.marker("methodAutoformat");
verify.currentLineContentIs("        protected doThing() {");
goTo.marker("methodIndent");
verify.indentationIs(12);