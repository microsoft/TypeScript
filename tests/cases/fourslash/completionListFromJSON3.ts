/// <reference path='fourslash.ts'/>

// @Filename: json1.json
////{
////    "foo": "foo",
////    "bar": "bar"
////}

// @Filename: test.ts
////require("./json1")./*1*/

goTo.marker("1");
verify.completionListContains("foo");
verify.completionListContains("bar");
