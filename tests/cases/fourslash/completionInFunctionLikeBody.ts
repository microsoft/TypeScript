/// <reference path='fourslash.ts'/>

//// class Foo {
////     bar () {
////         /*1*/
////         class Foo1 {
////             bar1 () {
////                 /*2*/
////             }
////             /*3*/
////         }
////     }
////     /*4*/
//// }
    

goTo.marker("1");
verify.completionListContains("async", "async", /*documentation*/ undefined, "keyword");
verify.not.completionListContains("public", "public", /*documentation*/ undefined, "keyword");
verify.not.completionListContains("private", "private", /*documentation*/ undefined, "keyword");
verify.not.completionListContains("protected", "protected", /*documentation*/ undefined, "keyword");
verify.not.completionListContains("constructor", "constructor", /*documentation*/ undefined, "keyword");
verify.not.completionListContains("readonly", "readonly", /*documentation*/ undefined, "keyword");
verify.not.completionListContains("static", "static", /*documentation*/ undefined, "keyword");
verify.not.completionListContains("abstract", "abstract", /*documentation*/ undefined, "keyword");
verify.not.completionListContains("get", "get", /*documentation*/ undefined, "keyword");
verify.not.completionListContains("set", "set", /*documentation*/ undefined, "keyword");

goTo.marker("2");
verify.completionListContains("async", "async", /*documentation*/ undefined, "keyword");
verify.not.completionListContains("public", "public", /*documentation*/ undefined, "keyword");
verify.not.completionListContains("private", "private", /*documentation*/ undefined, "keyword");
verify.not.completionListContains("protected", "protected", /*documentation*/ undefined, "keyword");
verify.not.completionListContains("constructor", "constructor", /*documentation*/ undefined, "keyword");
verify.not.completionListContains("readonly", "readonly", /*documentation*/ undefined, "keyword");
verify.not.completionListContains("static", "static", /*documentation*/ undefined, "keyword");
verify.not.completionListContains("abstract", "abstract", /*documentation*/ undefined, "keyword");
verify.not.completionListContains("get", "get", /*documentation*/ undefined, "keyword");
verify.not.completionListContains("set", "set", /*documentation*/ undefined, "keyword");

goTo.marker("3");
verify.completionListContainsClassElementKeywords();

goTo.marker("4");
verify.completionListContainsClassElementKeywords();

