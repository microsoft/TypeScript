/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////const a = [|require("a")|];
////const b = [|require("b")|];

verify.codeFixAll({
    fixId: "requireInTs",
    fixAllDescription: "Convert all 'require' to 'import'",
    newFileContent:
`import a = require("a");
import b = require("b");`,
});
