/// <reference path='fourslash.ts'/>

// @allowJs: true

// @Filename: /foo.js
//// /*moduleDef*/function notExported() { }
//// class Blah {
////    abc = 123;
//// }
//// module.exports.Blah = Blah;

// @Filename: /bar.js
////const [|/*importDef*/BlahModule|] = require("./foo.js");
////new [|/*importUsage*/BlahModule|].Blah()

// @Filename: /barTs.ts
////import [|/*importDefTs*/BlahModule|] = require("./foo.js");
////new [|/*importUsageTs*/BlahModule|].Blah()

verify.baselineGoToDefinition("importDef", "importUsage", "importDefTs", "importUsageTs");