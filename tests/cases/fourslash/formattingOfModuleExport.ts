/// <reference path="fourslash.ts"/>
////module MemoryAnalyzer {
////    export module Foo.Charting { }
////    /**/

goTo.marker();
edit.insert("}");
verify.indentationIs(0);
