/// <reference path="fourslash.ts"/>
////namespace MemoryAnalyzer {
////    export namespace Foo.Charting { }
////    /**/

goTo.marker();
edit.insert("}");
verify.indentationIs(0);
