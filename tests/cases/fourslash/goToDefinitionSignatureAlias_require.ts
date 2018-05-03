/// <reference path='fourslash.ts'/>

// @allowJs: true

// @Filename: /a.js
////module.exports = function /*f*/f() {}

// @Filename: /b.js
////const f = require("./a");
////[|/*use*/f|]();

verify.goToDefinition("use", "f");
