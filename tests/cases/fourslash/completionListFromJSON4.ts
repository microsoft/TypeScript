/// <reference path='fourslash.ts'/>

// @Filename: json1.json
////{
////    "foo": {
////        "bar": {
////            "baz": "baz"
////        }
////    }
////}

// @Filename: test.ts
////require("./json1").foo.bar./*1*/

goTo.marker("1");
verify.completionListContains("baz");
