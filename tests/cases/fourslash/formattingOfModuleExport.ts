/// <reference path="fourslash.ts"/>
////module MemoryAnalyser {
////    export module Foo.Charting { }
////    /**/

goTo.marker();
edit.insert("}");
verify.indentationIs(0);
