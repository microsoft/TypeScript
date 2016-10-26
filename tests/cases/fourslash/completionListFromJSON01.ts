/// <reference path='fourslash.ts'/>

// @Module: commonjs
// @ModuleResolution: classic

// @Filename: json1.json
////{
////    "foo": "foo",
////    "bar": "bar"
////}

// @Filename: test.ts
////var json1 = require("./json1");
////json1./*1*/

goTo.marker("1");
// ModuleResolution is "classic" so no completion
verify.completionListIsEmpty();
