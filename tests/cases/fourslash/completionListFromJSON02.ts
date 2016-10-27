/// <reference path='fourslash.ts'/>

// @Module: amd
// @ModuleResolution: node

// @Filename: json1.json
////{
////    "foo": "foo",
////    "bar": "bar"
////}

// @Filename: test.ts
////var json1 = require("./json1");
////json1./*1*/

goTo.marker("1");
// Module is "amd" so no completion
verify.completionListIsEmpty();
